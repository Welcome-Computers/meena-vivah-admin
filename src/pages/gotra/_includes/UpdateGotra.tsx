import Modal from "antd/es/modal/Modal";
import  GotraForm  from "./GotraForm";
import { useUpdateGotraMutation } from "@/redux/features/masterGotra";
import { appMessage } from "@/lib/utility/message";

  export default function UpdateGotra(props: any) {
  const { isModalOpen, setIsModalOpen, form, selectedGotraId } = props;

  // update gotra
  const [handleUpdateGotra] = useUpdateGotraMutation();

  const handleUpdate = async (value: any) => {
    try {
      await handleUpdateGotra({
        id: selectedGotraId,
        body: {
          name: value["master-gotra"],
        },
      }).unwrap();

      appMessage.success("Gotra Updated successfully");
        setIsModalOpen(false);
    } catch (error: any) {
      console.log("UPDATE ERROR", error);
      appMessage.error(error?.data?.message || "Failed to update gotra");
    }
  };

  return (
    <>
      {/* update value modal */}

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title="Update Gotra"
      >
        <GotraForm form={form} handleOnSubmit={handleUpdate} />
      </Modal>
    </>
  );
};
