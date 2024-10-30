import React from "react";
import Modal from "react-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarEvent } from "../models/apiModels";
import { DateFormat, formatDateToString } from "../utils/dateUtil";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#D3D3D3",
  },
  overlay: { zIndex: 1000 },
};

Modal.setAppElement("#root");
interface ViewEventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  calendarEvent: CalendarEvent | null;
}
const ViewEventModal: React.FC<ViewEventModalProps> = ({
  isOpen,
  closeModal,
  calendarEvent,
}) => {
  const queryClient = useQueryClient();

  const { isError, mutate, isPending } = useMutation({
    mutationFn: (event) => {
      //   return deleteData(`/event/${calendarEvent?.id}`);
      console.log("deleting data", event);
      return Promise.resolve();
    },
    onSuccess: (data) => {
      console.log("success data", data);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      closeModal();
    },
    onError: (error) => {
      console.error("on error", error);
    },
  });
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnEsc={true}
      >
        <div>
          <h1 className="text-2xl">Event Details</h1>
          <div className="m-2">
            <p className="text-xl">Title</p>
            <p>{calendarEvent?.apiEvent.title}</p>
          </div>
          <div className="m-2">
            <p className="text-xl">Description</p>
            <p>{calendarEvent?.apiEvent.description}</p>
          </div>
          <div className="m-2">
            <p className="text-xl">Participants</p>
            <p>{calendarEvent?.apiEvent.participants}</p>
          </div>
          <div className="m-2">
            <p className="text-xl">Start</p>
            <p>
              {formatDateToString(
                calendarEvent?.start,
                DateFormat["do MMM yyyy h:mm a"]
              )}
            </p>
          </div>
          <div className="m-2">
            <p className="text-xl">End</p>
            <p>
              {formatDateToString(
                calendarEvent?.end,
                DateFormat["do MMM yyyy h:mm a"]
              )}
            </p>
          </div>
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
            onClick={() => mutate()}
            disabled={isPending}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ViewEventModal;
