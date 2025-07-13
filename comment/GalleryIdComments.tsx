import { type FC, useState } from "react";
import GalleryIdCommentCard from "./GalleryIdCommentCard";
import GalleryIdNewComment from "./GalleryIdNewComment";
import getProjectComments from "../../../utils/swr/projectComments";
import LoadingSpinner from "../../shared/LoadingAnimation";
import { convertDate } from "../../../utils/constants/shared/convertDate";
import { useSession } from "next-auth/react";
import { type UserSession } from "../../../utils/types/auth/userSession";

type Props = FC<{
  projectId: number;
  competition?: boolean;
}>;

const GalleryIdComments: Props = ({ projectId, competition = false }) => {
  const session = useSession().data?.user as UserSession;
  const currentUserUsername = session?.username;
  const token = session?.access;

  const [isReplying, setIsReplying] = useState(false);

  const { projectComments, isLoading, isError } = getProjectComments(
    projectId,
    token,
    competition
  );

  if (isLoading || isError) return <LoadingSpinner />;

  return (
    <div className="mt-14 flex w-full flex-col space-y-3 p-2">
      {/* Number of comments */}
      <label className="text-2xl font-semibold">
        {projectComments?.comments?.length ?? 0} comments
      </label>
      {/* Comments */}
      {projectComments?.comments?.map((comment, index) => (
        <GalleryIdCommentCard
          key={index}
          user_id={comment.user_id}
          fullName={`${comment.first_name} ${comment.last_name}`}
          like_button_status={comment?.like_button_status}
          username={comment.username}
          token={session?.access}
          projectId={projectId}
          image={comment.profile_picture}
          commentId={comment.id}
          name={comment.user}
          uploadTime={convertDate(comment.created_at)}
          comment={comment.comment}
          currentUserUsername={currentUserUsername}
          replies={comment.children}
          competition={competition}
          onReplyingChange={setIsReplying}
        />
      ))}
      {!isReplying && (
        <GalleryIdNewComment projectId={projectId} competition={competition} />
      )}
    </div>
  );
};

export default GalleryIdComments;
