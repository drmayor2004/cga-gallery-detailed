import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { type FC, useState, type Dispatch, type SetStateAction } from "react";
import { useSWRConfig } from "swr";
import djangoAPI from "../../../utils/constants/api/django";
import removeNullFromObj from "../../../utils/constants/shared/removeNullFromObj";
import Button from "../../Auth/SubmitButton";
import type { UserSession } from "../../../utils/types/auth/userSession";
import uEmojiParser from "universal-emoji-parser";
import ErrorMessageCard from "../../upload/ErrorMessageCard";

/**
 * Remove emojis from string
 * @param string - string to remove emojis from
 * @returns
 */
const removeEmojis = (string: string) => {
  const regex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  return string.replace(regex, "//---//");
};

/**
 * Get emoji positions from string
 * @param string - string to get emoji positions from
 * @returns
 */
const getEmojisPositions = (string: string) => {
  const regex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  const positions = [];
  let match;
  while ((match = regex.exec(string))) {
    positions.push({
      emoji: uEmojiParser.parseToShortcode(match[0]),
      position: match.index,
    });
  }

  return positions;
};

/**
 * Add back emojis at positions
 * @param string - string to add back at positions
 * @param positions - positions to add back at
 * @returns
 */
export const addBackAtPositions = (
  string: string,
  positions: { emoji: string; position: number }[]
) => {
  let newString = string;

  newString = removeEmojis(newString);

  positions.forEach((position) => {
    newString = newString.replace("//---//", position.emoji);
  });

  return newString;
};

/**
 * Get correct endpoint url for comment
 * @param competition - if it's for competition
 * @param commentId - the comment id
 * @param project_id - the project id
 * @returns
 */
const getCorrectUrl = (
  competition: boolean,
  commentId: number | null,
  project_id: number,
  isEditting = false
) => {
  if (competition) {
    if (isEditting) {
      return `/submission_comment/${project_id}/comments/${commentId}/`;
    }

    return `/submission_comment/${project_id}/comments/`;
  }

  if (isEditting) {
    return `/project_comments/${project_id}/comments/${commentId}/`;
  }

  return `/project_comments/${project_id}/comments/`;
};

/**
 * Get title of the comment box
 *
 * @param commentId - the comment id
 * @param isEditting - if it's for editting
 * @returns - title of the comment box
 */
const getTitle = (commentId: number | null, isEditting: boolean) => {
  if (isEditting) {
    return "Edit";
  }

  if (commentId) {
    return "Reply";
  }

  return "New";
};

type Props = FC<{
  projectId: number;
  commentId?: number | null;
  handleCloseReplying?: () => void | null;
  isEditting?: boolean;
  dataToEdit?: string | null;
  competition?: boolean;
}>;

const GalleryIdNewComment: Props = ({
  projectId,
  commentId = null,
  handleCloseReplying = null,
  isEditting = false,
  dataToEdit = null,
  competition = false,
}) => {
  // Hooks
  const session = useSession().data?.user as UserSession;
  const unAuthenticated = useSession().status === "unauthenticated";
  const token = session?.access;
  const { mutate } = useSWRConfig();

  // States
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  // Functions
  const disableButton = () => {
    setDisabled(true);
  };

  const showErrorMessage = (bool: boolean) => {
    setErrorMessage(bool);
  };

  const onSubmit = async (
    values: { comment: string | null },
    setValues: Dispatch<SetStateAction<{ comment: string | null }>>
  ) => {
    if (unAuthenticated) {
      location.href = "/login";
      return;
    }

    disableButton();
    showErrorMessage(false);

    const data: {
      [x: string]: string | number | null;
      parent_comment_id: number | null;
    } = {
      project: projectId,
      [competition ? "submission_comment" : "comment"]: addBackAtPositions(
        values.comment ?? "",
        getEmojisPositions(values.comment ?? "")
      ),
      parent_comment_id: commentId,
    };

    if (competition) {
      // data.submission_comment_likes_count = 0;
      delete data.project;
    }

    await axios[!isEditting ? "post" : "put"](
      djangoAPI(getCorrectUrl(competition, commentId, projectId, isEditting)),
      removeNullFromObj(data),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(() => {
        if (handleCloseReplying) {
          handleCloseReplying();
        }
        setValues({ comment: "" });
        mutate(
          djangoAPI(
            competition
              ? `/submission_comment/${projectId}/comments/`
              : `/project_comments/${projectId}/comments/`
          )
        );
      })
      .catch(() => {
        showErrorMessage(true);
        setDisabled(false);
        return;
      });
  };

  return (
    <>
      <Formik
        initialValues={{ comment: dataToEdit ?? null }}
        onSubmit={(values, { setValues }) => onSubmit(values, setValues)}
      >
        <Form className="mt-14 flex w-full flex-col space-y-3 p-2">
          <label className="text-2xl font-semibold">
            {getTitle(commentId, isEditting)} comment
          </label>

          {errorMessage ? (
            <ErrorMessageCard message="There was an issue submitting your comment" />
          ) : null}
          <Field
            name="comment"
            as="textarea"
            placeholder="Write a comment..."
            className="h-48 w-full rounded-main border border-gray-300 p-2 focus:border-primary focus:ring-primary focus:ring-1 focus:outline-none dark:bg-secondary dark:text-white"
          />

          <div className="flex w-full flex-row justify-end space-x-1">
            {commentId && (
              <Button
                onClick={handleCloseReplying as () => void}
                className="secondaryButton !px-12"
              >
                <span>Cancel</span>
              </Button>
            )}

            <Button
              disabled={disabled}
              type="submit"
              className={`primaryButton ${
                disabled ? "!bg-gray-400" : ""
              } !px-12`}
            >
              <span>Submit</span>
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default GalleryIdNewComment;
