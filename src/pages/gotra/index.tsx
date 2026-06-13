import AdminLayout from "@/components/layout/AdminLayout";
import GotraTable from "@/components/master-gotra/GotraTable";
import { appMessage } from "@/lib/utility/message";
import {
  useDeleteGotraMutation,
  useGetGotrasQuery,
} from "@/redux/features/masterGotra";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import  UpdateGotra  from "./_includes/UpdateGotra";
import { Form } from "antd";

const Gotra = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGotraId, setSelectedGotraId] = useState<number | null>(null);

  const [form] = Form.useForm();

  // get gotra list
  const { data, isLoading, error } = useGetGotrasQuery({ page, limit: 10 });
  const gotraList = data || [];
  const pagination = data?.pagination || {};

  // delet gotra
  const [deleteGotra] = useDeleteGotraMutation();
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteGotra(id).unwrap();
      if (res?.success) {
        appMessage.success("Gotra deleted successfully");
      }
    } catch (error: any) {
      appMessage.error(error?.data?.message || "Failed to delete gotra");
    }
  };

  // update gotra
  const handleEdit = async (id: number, body: any) => {
    try {
      if (id) {
        setIsModalOpen(true);
        setSelectedGotraId(id);
      }
      form.setFieldsValue({
        "master-gotra": body?.name,
      });
    } catch (error: any) {
      appMessage.error(error?.data?.message || "Failed to edit gotra");
    }
  };

  return (
    <AdminLayout>
      <div>
        <Title level={5} style={{ marginBottom: 16 }}>
          All Gotra
        </Title>

        <UpdateGotra
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          form={form}
          selectedGotraId={selectedGotraId}
        />

        <GotraTable
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          loading={isLoading}
          data={gotraList}
          pagination={pagination}
        />
      </div>
    </AdminLayout>
  );
};

export default Gotra;
