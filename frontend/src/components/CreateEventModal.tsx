import React from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { CreateEventFormModel } from "../models/formikModels";
import { FormErrorLabel } from "../widgets/FormErrorLabel";
import {
  DateFormat,
  formatDateToString,
  formatDateUsingISO,
} from "../utils/dateUtil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "../utils/api";
import { createEventValidationSchema } from "../validators/formikValidators";

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
interface CreateEventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
}
const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  closeModal,
  startDate,
  endDate,
}) => {
  const queryClient = useQueryClient();
  const { isError, mutate } = useMutation({
    mutationFn: (event) => {
      return postData(event, "/event");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      closeModal();
    },
    onError: (error) => {
      console.error("on error", error);
    },
  });

  // Replace is used because T is interpreted as unix timestamp but html input element needs it
  const eventStart = startDate
    ? formatDateToString(startDate, DateFormat["yyyy-MM-ddThh:mm"]).replace(
        "$$",
        "T"
      )
    : "";
  const eventEnd = endDate
    ? formatDateToString(endDate, DateFormat["yyyy-MM-ddThh:mm"]).replace(
        "$$",
        "T"
      )
    : "";
  const initialValues: CreateEventFormModel = {
    title: "",
    description: "",
    startDate: eventStart,
    endDate: eventEnd,
    participants: "",
  };

  const { values, errors, handleSubmit, handleChange, handleBlur, touched } =
    useFormik<CreateEventFormModel>({
      initialValues: initialValues,
      validationSchema: createEventValidationSchema,
      onSubmit: (values) => {
        const payload = {
          title: values.title,
          description: values.description,
          start_date: formatDateUsingISO(values.startDate),
          end_date: formatDateUsingISO(values.endDate),
          // todo make participants json
          participants: "",
          // todo handle/create cron
          cron: "*****",
        };
        mutate(payload);
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
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl">Create New Event</h1>
          <div className="flex flex-col my-2">
            <label className="text-lg" htmlFor="title">
              Title
            </label>
            <input
              className="h-10 border border-gray-300 rounded px-2"
              type="text"
              name="title"
              placeholder="Event title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            <FormErrorLabel show={touched.title} errorText={errors.title} />
          </div>
          <div className="flex flex-col my-2">
            <label className="text-lg" htmlFor="description">
              Description
            </label>
            <input
              className="h-10 border border-gray-300 rounded px-2"
              type="text"
              name="description"
              placeholder="Event Description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            <FormErrorLabel
              show={touched.description}
              errorText={errors.description}
            />
          </div>
          <div className="flex flex-col my-2">
            <label className="text-lg" htmlFor="startDate">
              Starts at:
            </label>
            <input
              className="h-10 border border-gray-300 rounded px-2"
              type="datetime-local"
              name="startDate"
              placeholder="Event starts at"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.startDate}
            />
            <FormErrorLabel
              show={touched.startDate}
              errorText={errors.startDate}
            />
          </div>
          <div className="flex flex-col my-2">
            <label className="text-lg" htmlFor="endDate">
              Ends at:
            </label>
            <input
              className="h-10 border border-gray-300 rounded px-2"
              type="datetime-local"
              name="endDate"
              placeholder="Ends at:"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.endDate}
            />
            <FormErrorLabel show={touched.endDate} errorText={errors.endDate} />
          </div>
          <div className="text-center">
            {isError && (
              <FormErrorLabel show={true} errorText="Couldnt create event." />
            )}
            <button
              type="submit"
              className="bg-green-400 text-white font-bold py-2 px-4 rounded-full self-center"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreateEventModal;