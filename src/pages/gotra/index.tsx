import AdminLayout from "@/components/layout/AdminLayout";

import SearchField from "@/components/InputElements/SearchField";
import GotraTable from "@/components/master-gotra/GotraTable";
import { appMessage } from "@/lib/utility/message";
import {
  useDeleteGotraMutation,
  useGetGotrasQuery,
} from "@/redux/features/masterGotra";
import { Form } from "antd";
import Title from "antd/es/typography/Title";
import { debounce } from "lodash";
import { useMemo, useState } from "react";
import UpdateGotra from "./_includes/UpdateGotra";

const Gotra = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGotraId, setSelectedGotraId] = useState<number | null>(null);
  const [selectedGotra, setSelectedGotra] = useState<string | null>(null);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  // serching state
  const [inputValue, setInputValue] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const [form] = Form.useForm();

  // Get Gotra list
  const { data, isLoading, error } = useGetGotrasQuery({
    page,
    limit: 10,
    ...(search && { search }),
    ...(sortField && { sortField }),
    ...(sortOrder && { sortOrder }),
  });
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
        setSelectedGotra(body.name);
      }
      form.setFieldsValue({
        "master-gotra": body?.name,
      });
    } catch (error: any) {
      appMessage.error(error?.data?.message || "Failed to edit gotra");
    }
  };

  // SEARCHING PART
  // debouncing funtion
  const debounceSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
      }, 500),
    [setSearch],
  );

  // handle Onchnage State
  const handleInputChange = (v: string) => {
    setInputValue(v);
    if (!v) {
      debounceSearch("");
      return;
    }

    if (v.length < 3) {
      return;
    }
    debounceSearch(v);
  };

  // trigger search
  const onSubmit = () => {
    if (inputValue.length < 3) {
      return;
    }
    setSearch(inputValue);
  };

  // sorting data
  const handleSort = (sorter: any) => {
    setSortField(sorter.field || "");
    setSortOrder(sorter.order || "");
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
          selectedGotra={selectedGotra}
        />

        {/* serach field */}
        <Form onFinish={onSubmit}>
          <SearchField
            handleInputChange={handleInputChange}
            rules={[
              {
                validator: (_: any, value: string) => {
                  if (!value || value.length >= 3) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Minimum 3 Character required"),
                  );
                },
              },
            ]}
          />
        </Form>

        {/* table coloum >> table  */}
        <GotraTable
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleSort={handleSort}
          isLoading={isLoading}
          pagination={pagination}
          data={data}
        />
      </div>
    </AdminLayout>
  );
};

export default Gotra;
