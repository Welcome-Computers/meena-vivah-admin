import { appMessage } from "@/lib/utility/message";
import  { FormInstance } from "antd/es/form/Form";
import AdminLayout from "@/components/layout/AdminLayout";
import Title from "antd/es/typography/Title";
import { useCreateOccupationMutation } from "../../redux/features/masterOccupation";
import GenericForm from "@/components/common/GenericForm";

interface iProps {
  form: FormInstance;
}

const CreateOccupation = (props: iProps) => {
  const { form } = props || {};

  const [createOccupation] = useCreateOccupationMutation();

  const handleCreateOccupation = async (value: any) => {
    try {
      const res = await createOccupation({
        name: value["master-occupation"],
      }).unwrap();

      if (res?.success) {
        appMessage.success("Occupation added successfully");

        return {
          label: res?.data?.[0]?.name,
          value: res?.data?.[0]?.code,
        };
      }
    } catch (error: any) {
      appMessage.error(error?.data?.message || "Failed to add Occupation");
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <Title level={3} className="mb-4">
          Create Occupation
        </Title>

        <GenericForm
          handleOnSubmit={handleCreateOccupation}
          form={form}
          name="master-occupation"
          label="Create Occupation"
        />
      </div>
    </AdminLayout>
  );
};

export default CreateOccupation;
