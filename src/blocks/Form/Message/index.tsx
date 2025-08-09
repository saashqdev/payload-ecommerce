import { type SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import RichText from "@/components/RichText";

import { Width } from "../Width";

export const Message = ({ message }: { message: SerializedEditorState }) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichText data={message} />}
    </Width>
  );
};
