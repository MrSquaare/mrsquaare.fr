import { Mode, OpenMode } from "fs";

export type ReadOptions = {
  encoding?: BufferEncoding;
  flag?: OpenMode;
};

export type WriteOptions = {
  encoding?: BufferEncoding;
  flag?: OpenMode;
  mode?: Mode;
};
