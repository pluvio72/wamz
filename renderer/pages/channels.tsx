import React, { MouseEvent, useLayoutEffect, useState } from "react";
import AddChannelModal, {
  ChannelDb,
} from "../page-components/channels/channel-modal";
import { HiPencil } from "react-icons/hi2";
import ChannelContextMenu from "../page-components/channels/channel-context-menu";
import Tile from "../components/tile";

export default function Channels() {
  const [channels, setChannels] = useState([]);
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const [showChannelOptions, setShowChannelOptions] = useState(false);
  const [channelOptionPos, setChannelOptionPos] = useState({ x: 0, y: 0 });
  const [channelContext, setChannelContext] = useState("");

  const openAddChannelModal = () => setShowAddChannelModal(true);

  useLayoutEffect(() => {
    ChannelDb.allDocs({ include_docs: true }).then((docs) => {
      setChannels(docs.rows);
    });
  }, []);

  const openChannelOptions = (
    e: MouseEvent<HTMLDivElement>,
    channelId: string
  ) => {
    e.preventDefault();
    setChannelOptionPos({ x: e.pageX, y: e.pageY });
    setChannelContext(channelId);
    setShowChannelOptions(true);
  };

  const closeChannelOptions = () => {
    setShowChannelOptions(false)
    setChannelContext(undefined)
  }

  const contextActions = {
    editChannel: () => setShowAddChannelModal(true)
  }

  return (
    <div className="grid grid-cols-4">
      <div
        className="h-[255px] w-[170px] flex flex-col items-center justify-center bg-neutral-500 rounded-lg cursor-pointer hover:bg-neutral-600 transition"
        onClick={openAddChannelModal}
      >
        <p className="font-light text-md animate-pulse text-neutral-100">
          Click to add channel
        </p>
      </div>
      {channels.map((channel) => (
        <Tile
          image={channel.doc.image}
          onContextMenu={(e) => openChannelOptions(e, channel)}
        />
      ))}
      {showChannelOptions && (
        <ChannelContextMenu
          pos={channelOptionPos}
          close={closeChannelOptions}
          actions={contextActions}
        />
      )}
      <AddChannelModal
        open={showAddChannelModal}
        setOpen={setShowAddChannelModal}
        channelInfo={channelContext as any}
      />
    </div>
  );
}
