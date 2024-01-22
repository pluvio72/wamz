import { Dialog, Transition } from "@headlessui/react";
import React, { ChangeEvent, Fragment, useRef, useState } from "react";
import { ModalProps } from "../../../components/modal";
import TextInput from "../../../components/text-input";
import Button from "../../../components/button";
import { EpisodeInfo } from "../../../types";
import { HiPencil } from "react-icons/hi2";

export default function AddEpisodeModal({ open, onAdd, setOpen }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [name, setName] = useState("");

  const selectEpisode = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const calculateVideoDuration = (file, callback) => {
    let videoElem = document.createElement("video");
    videoElem.preload = `metadata`;

    videoElem.onloadedmetadata = function () {
      window.URL.revokeObjectURL(videoElem.src);
      let duration = videoElem.duration;

      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);

      callback(minutes, seconds);
    };

    videoElem.src = URL.createObjectURL(file);
  };

  const saveEpisode = () => {
    if (file) {
      calculateVideoDuration(file, (minutes, seconds) => {
        onAdd({
          name,
          videoPath: file.path,
          duration: `${minutes}:${seconds}`,
        });
        setFile(undefined);
        setName("");
        setOpen(false);
      });
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[35%]">
                <div className="bg-black p-4">
                  {!file ? (
                    <Button color="gray" onClick={selectEpisode}>
                      <span className="flex items-center justify-center">
                        Select file
                        <HiPencil className="ml-2" />
                      </span>
                    </Button>
                  ) : (
                    <TextInput
                      endIcon={<HiPencil />}
                      disabled
                      onChange={() => {}}
                      onClick={selectEpisode}
                      value={file?.name}
                      className="text-neutral-200"
                    />
                  )}
                  <TextInput
                    parentClassName="mt-2 mb-4"
                    onChange={(newVal) => setName(newVal)}
                    value={name}
                    placeholder="Episode name"
                  />
                  <div
                    className="flex flex-row items-center gap-x-2"
                    onClick={() => setOpen(false)}
                  >
                    <Button color="light-gray">Cancel</Button>
                    <Button color="green" onClick={saveEpisode}>
                      Save
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Dialog>
    </Transition.Root>
  );
}

interface Props extends ModalProps {
  onAdd(episodeInfo: EpisodeInfo);
}
