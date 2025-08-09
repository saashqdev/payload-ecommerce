import { type SerializedEditorState, type SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";

import {
  paddingBottomClasses,
  paddingTopClasses,
  spacingBottomClasses,
  spacingTopClasses,
} from "@/blocks/globals";
import RichText from "@/components/RichText";
import { cn } from "src/utilities/cn";

import { Media } from "../../components/Media";

import type { MediaBlock as MediaBlockProps } from "@/payload-types";
import type { StaticImageData } from "next/image";

type Props = MediaBlockProps & {
  breakout?: boolean;
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  imgClassName?: string;
  staticImage?: StaticImageData;
  disableInnerContainer?: boolean;
};

export const MediaBlock = (props: Props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    spacingTop,
    spacingBottom,
    paddingBottom,
    paddingTop,
  } = props;

  let caption: SerializedEditorState<SerializedLexicalNode> | null | undefined;
  if (media && typeof media === "object") caption = media.caption;

  return (
    <div
      className={cn(
        "",
        {
          container: enableGutter,
        },
        className,
        spacingTopClasses[spacingTop ?? "medium"],
        spacingBottomClasses[spacingBottom ?? "medium"],
        paddingTopClasses[paddingTop ?? "medium"],
        paddingBottomClasses[paddingBottom ?? "medium"],
      )}
    >
      <Media
        imgClassName={cn("border border-border rounded-[0.8rem]", imgClassName)}
        resource={media}
        src={staticImage}
      />
      {caption && (
        <div
          className={cn(
            "mt-6",
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  );
};
