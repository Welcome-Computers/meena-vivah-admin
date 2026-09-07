import GenericForm from "@/components/common/GenericForm";
import { appMessage } from "@/lib/utility/message";
import { useUpdateOccupationMutation } from "@/redux/features/masterOccupation";
import Modal from "antd/es/modal/Modal";

export default function UpdateOccupation(props: any) {
  const {
    isModalOpen,
    setIsModalOpen,
    form,
    occupationId,
    selectedOccupation,
  } = props;

  // update occupation
  const [handleUpdateOccupation] = useUpdateOccupationMutation();

  const handleUpdate = async (value: any) => {
    try {
      // check update value is chnaged or not
      if (selectedOccupation?.trim() === value["master-occupation"]?.trim()) {
        appMessage.error("Failed to update same value");
        setIsModalOpen(false);
        return;
      }
      await handleUpdateOccupation({
        id: occupationId,
        body: {
          name: value["master-occupation"],
        },
      }).unwrap();

      appMessage.success("Occupation Updated successfully");
      setIsModalOpen(false);
    } catch (error: any) {
      console.log("UPDATE ERROR", error);
      appMessage.error(error?.data?.message || "Failed to update occupation");
    }
  };

  return (
    <>
      {/* update value modal */}

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title="Update Occupation"
      >
        <GenericForm
          handleOnSubmit={handleUpdate}
          form={form}
          name="master-occupation"
          label="Create Occupation"
        />
      </Modal>
    </>
  );
}
