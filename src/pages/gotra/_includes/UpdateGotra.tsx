import Modal from "antd/es/modal/Modal";
import { useUpdateGotraMutation } from "@/redux/features/masterGotra";
import { appMessage } from "@/lib/utility/message";
import GenericForm from "@/components/common/GenericForm";

export default function UpdateGotra(props: any) {
  const { isModalOpen, setIsModalOpen, form, selectedGotraId, selectedGotra } =
    props;

  // update gotra
  const [handleUpdateGotra] = useUpdateGotraMutation();

  const handleUpdate = async (value: any) => {
    try {
      // check update value is chnaged or not
      if (selectedGotra?.trim() === value["master-gotra"]?.trim()) {
        appMessage.error("Failed to update same value");
        setIsModalOpen(false);
        return;
      }

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
         <GenericForm
               handleOnSubmit={handleUpdate} 
               form={form} 
               name="master-gotra"
               label="Create Gotra"
               />
      </Modal>
    </>
  );
}
