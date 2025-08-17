import React from "react";
import YouTube from "react-youtube";
import ReactMarkdown from 'react-markdown';

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 0,
  },
};

function ChapterContent({ chapter, content }) {
  console.log("Chapter content:", content?.Content);
  return (
    <div className="p-10">
      <h2 className="font-medium text-2xl">{chapter?.name}</h2>
      <p className="text-gray-500">{chapter?.about}</p>

      {/* Video */}
      <div className="flex justify-center my-6">
        <YouTube videoId={content?.videoId} opts={opts} />
      </div>

      <div>
        {content?.content?.map((item, index) => (
          <div className="p-5 bg-sky-50 mb-3 rounded-lg">
            <h2 className="font-medium text-lg">{item.title}</h2>
            {/* <p className="whitespace-pre-wrap">{item?.description}</p> */}
            <ReactMarkdown>{item?.description}</ReactMarkdown>
            {item.code && (
              <div className="p-4 bg-black text-white rounded-md mt-3">
                <pre>
                  <code>{item.code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Content */}
    </div>
  );
}

export default ChapterContent;
