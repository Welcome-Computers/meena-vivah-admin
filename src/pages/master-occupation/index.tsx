import SearchField from "@/components/InputElements/SearchField";
import AdminLayout from "@/components/layout/AdminLayout";
import OccupationTable from "@/components/master-occupation/OccupationTable";
import {
  useDeleteOccupationMutation,
  useGetOccupationsQuery,
} from "@/redux/features/masterOccupation";
import { Form } from "antd";
import Title from "antd/es/typography/Title";
import { debounce } from "lodash";
import { useMemo, useState } from "react";
import UpdateOccupation from "./_includes/UpdateOccupation";

const Occupation = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [occupationId, setOccupationId] = useState<number | null>(null);
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(
    null,
  );

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // serching state
  const [inputValue, setInputValue] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const [form] = Form.useForm();

  // Get occupation list
  const { data, isLoading, error } = useGetOccupationsQuery({
    page,
    limit: 10,
    ...(search && { search }),
    ...(sortField && { sortField }),
    ...(sortOrder && { sortOrder }),
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

  // SORTING PART
  const handleSort = (sorter: any) => {
    setSortField(sorter.field || "");
    setSortOrder(sorter.order || "");
  };

  return (
    <AdminLayout>
      <div>
        <Title level={5} style={{ marginBottom: 16 }}>
          All Occupation
        </Title>

        {/* update field*/}
        <UpdateOccupation
          setOccupationId={setOccupationId}
          occupationId={occupationId}
          selectedOccupation={selectedOccupation}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          form={form}
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
        <OccupationTable
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

export default Occupation;
