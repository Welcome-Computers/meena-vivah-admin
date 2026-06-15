import AdminLayout from "@/components/layout/AdminLayout";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { Form } from "antd";
import {
  useDeleteOccupationMutation,
  useGetOccupationsQuery,
} from "@/redux/features/masterOccupation";
import OccupationTable from "@/components/master-occupation/OccupationTable";
import UpdateOccupation from "./_includes/UpdateOccupation";
import { appMessage } from "@/lib/utility/message";

const Occupation = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [occupationId, setOccupationId] = useState<number | null>(null);
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(
    null,
  );

  const [form] = Form.useForm();

  // get occupation list
  const { data, isLoading, error } = useGetOccupationsQuery({
    page,
    limit: 10,
  });
  const occupationList = data || [];
  const pagination = data?.pagination || {};

  // delet occupation
  const [deleteOccupation] = useDeleteOccupationMutation();
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteOccupation(id).unwrap();
      if (res?.success) {
        appMessage.success("Occupation deleted successfully");
      }
    } catch (error: any) {
      appMessage.error(error?.data?.message || "Failed to delete occupation");
    }
  };

  // update occupation
  const handleEdit = async (id: number, body: any) => {
    try {
      if (id !== null) {
        setIsModalOpen(true);
        setOccupationId(id);
        setSelectedOccupation(body.name);
      }
      form.setFieldsValue({
        "master-occupation": body?.name,
      });
    } catch (error: any) {
      appMessage.error(error?.data?.message || "Failed to edit occupation");
    }
  };

  return (
    <AdminLayout>
      <div>
        <Title level={5} style={{ marginBottom: 16 }}>
          All Occupation
        </Title>

        <UpdateOccupation
          setOccupationId={setOccupationId}
          occupationId={occupationId}
          selectedOccupation={selectedOccupation}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          form={form}
        />
        <OccupationTable
          loading={isLoading}
          data={occupationList}
          pagination={pagination}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </AdminLayout>
  );
};

export default Occupation;
