import GenericForm from "@/components/common/GenericForm";
import AdminLayout from "@/components/layout/AdminLayout";
import { appMessage } from "@/lib/utility/message";
import { useCreateGotraMutation } from "@/redux/features/masterGotra";
import { FormInstance } from "antd/es/form/Form";
import Title from "antd/es/typography/Title";

interface iProps {
  form: FormInstance;
}

const CreateGotra = (props: iProps) => {
  const { form } = props || {};

  const [createGotra] = useCreateGotraMutation();

  const handleCreateGotra = async (value: any) => {
    try {
      const res = await createGotra({
        name: value["master-gotra"],
      }).unwrap();

      if (res?.success) {
        appMessage.success("Gotra added successfully");

        return {
          label: res?.data?.[0]?.name,
          value: res?.data?.[0]?.code,
        };
      }
    } catch (error: any) {
      appMessage.error(error?.data?.message || "Failed to add gotra");
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <Title level={3} className="mb-4">
          Create Gotra
        </Title>
        <GenericForm
          handleOnSubmit={handleCreateGotra}
          form={form}
          name="master-gotra"
          label="Create Gotra"
        />
      </div>
    </AdminLayout>
  );
};

export default CreateGotra;
