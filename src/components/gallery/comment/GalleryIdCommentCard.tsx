'use client'

import React, { useState } from "react";
import type { FC } from "react";
import axios from "axios";
import djangoAPI from "../../../utils/constants/api/django";
import { useSWRConfig } from "swr";
import GalleryIdCommentDeleteModal from "./GalleryIdCommentDeleteModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GalleryIdNewComment from "./GalleryIdNewComment";
import { convertDate } from "../../../utils/constants/shared/convertDate";
import Image from "next/image";
import Link from "next/link";
import type { UserSession } from "../../../utils/types/auth/userSession";
import type { ProjectComments } from "../../../utils/types/api/project/project_comment";
import uEmojiParser from "universal-emoji-parser";

type Props = FC<{
  token: string;
  user_id: number;
  fullName: string;
  like_button_status: boolean;
  username: string;
  commentId: number;
  projectId: number;
  name: string;
  uploadTime: string | null;
  comment: string;
  replies?: [] | ProjectComments[];
  currentUserUsername: string | undefined;
  image: string;
  reply?: boolean;
  competition?: boolean;
  onReplyingChange?: (open: boolean) => void;
}>; 

const findEmojiByShortcode = (string: string) => {
  const regex = /:[a-z_]+:/g;
  const emojis = [];
  let match;
  while ((match = regex.exec(string))) {
    emojis.push({
      shortCode: match[0],
      emoji: uEmojiParser.parseToUnicode(match[0]),
      position: match.index,
    });
  }

  return emojis;
};

const replaceShortCodeWithEmoji = (string: string) => {
  let newString = string;

  const emojis = findEmojiByShortcode(newString);

  emojis.forEach((emoji) => {
    newString = newString.replace(emoji.shortCode, emoji.emoji);
  });
  return newString;
};

const GalleryIdCommentCard: Props = ({
  token,
  user_id,
  fullName,
  like_button_status,
  username,
  commentId,
  projectId,
  name,
  uploadTime,
  comment,
  replies,
  currentUserUsername,
  image,
  reply,
  competition = false,
  onReplyingChange,
}) => {
  // Hooks

  const { mutate } = useSWRConfig();
  const isAuthenticated = useSession().status === "authenticated";
  const currentUserId = (useSession().data?.user as UserSession)?.id;

  const router = useRouter();

  // States
  const [isOpen, setIsOpen] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditting, setIsEditting] = useState(false);

  // Functions
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const toggleEditting = () => {
    const newValue = !isEditting;
    setIsEditting(newValue);
    onReplyingChange?.(newValue);
  };

  const handleReplying = () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      if (isEditting) {
        setIsEditting(false);
        onReplyingChange?.(false);
      }

      const newValue = !isReplying;
      setIsReplying(newValue);
      onReplyingChange?.(newValue);
    }
  };

  const handleCloseReplying = () => {
    setIsReplying(false);
    setIsEditting(false);
    onReplyingChange?.(false);
  };

  // const likeComment = async () => {

  const deleteComment = async () => {
    await axios
      .delete(
        djangoAPI(`/project_comments/${projectId}/comments/${commentId}/`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        mutate(djangoAPI(`/project_comments/${projectId}/comments/`));
        setTimeout(() => {
          closeModal();
        }, 400);
      })
      .catch(() => {
        return;
      });
  };

  return (
    <>
      <div
        className={`flex h-auto w-auto flex-row items-center space-x-2 py-2 sm:space-x-4 ${
          reply ? "ml-12 lg:ml-24" : ""
        }`}
      >
        <Link
          href={`/profile/${username}`}
          className="relative flex h-14 w-14 rounded-full bg-gray-400 sm:h-20 sm:w-20"
        >
          <Image
            src={image}
            alt={`CGAfrica | ${name} comment`}
            fill
            className="rounded-full object-cover"
          />
        </Link>

        <div className="flex w-3/4 flex-col sm:w-auto">
          <div className="flex flex-row space-x-2">
            <Link
              href={`/profile/${username}`}
              className="text-lg font-medium capitalize"
            >
              {fullName}
            </Link>

            <p className=" text-gray-800">{uploadTime}</p>
          </div>

          <p className="overflow-x-hidden text-xl text-gray-900">
            {replaceShortCodeWithEmoji(comment)}
          </p>

          <div className="flex flex-row space-x-3">
            <button
              onClick={handleReplying}
              className="translate-y-2 text-left text-primary"
            >
              Reply
            </button>

            {/* <button onClick={likeComment} className="text-primary text-left translate-y-2">{!like_button_status ? 'Like' : 'Liked'}</button> */}

            {user_id === parseInt(currentUserId) && (
              <>
                <button
                  onClick={toggleEditting}
                  className="translate-y-2 text-left text-primary"
                >
                  Edit
                </button>

                <button
                  onClick={openModal}
                  className="translate-y-2 text-left text-primary"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2 pl-3 lg:pl-4">
        {replies?.map((comment, index) => (
          <GalleryIdCommentCard
            key={index}
            user_id={comment.user_id}
            fullName={`${comment.first_name} ${comment.last_name}`}
            like_button_status={like_button_status}
            username={username}
            token={token}
            commentId={comment.id}
            projectId={projectId}
            name={comment.user}
            uploadTime={convertDate(comment.created_at)}
            comment={comment.comment}
            replies={comment.children}
            currentUserUsername={currentUserUsername}
            image={comment.profile_picture}
            onReplyingChange={onReplyingChange}
          />
        ))}
      </div>

      {isEditting ? (
        <GalleryIdNewComment
          projectId={projectId}
          commentId={commentId}
          handleCloseReplying={handleCloseReplying}
          isEditting
          dataToEdit={replaceShortCodeWithEmoji(comment)}
          competition={competition}
        />
      ) : null}

      {isReplying ? (
        <GalleryIdNewComment
          projectId={projectId}
          commentId={commentId}
          handleCloseReplying={handleCloseReplying}
          competition={competition}
        />
      ) : null}

      <GalleryIdCommentDeleteModal
        isOpen={isOpen}
        closeModal={closeModal}
        deleteComment={deleteComment}
      />
    </>
  );
};

export default GalleryIdCommentCard;