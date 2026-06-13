import { useState } from "react";

import { Button, Space } from "antd";

import {
  AppstoreOutlined,
  TableOutlined,
} from "@ant-design/icons";

import {
  IPagination,
  IUser,
} from "@/redux/types";

import { ProfileCard } from "./ProfileCard";
import ProfileTable from "./ProfileTable";

interface iProps {
  loading: boolean;
  data: IUser[];
  pagination: IPagination;
  defaultShow?: "grid" | "table";
  title?: string;
  showToggle?: boolean;
  getUsers?: (page: number, limit?: number) => void
  headerRightSec?: any;
}

const ProfileContainer = (props: iProps) => {
  const {
    loading,
    data,
    pagination,
    getUsers,
    defaultShow = "grid",
    title = "Profiles",
    showToggle = true,
  } = props;

  const [view, setView] = useState<"grid" | "table">(defaultShow);

  const handlePaginationChange = (
    page: number,
    pageSize?: number
  ) => {
    getUsers?.(page, pageSize);
  };

  return (
    <div>
      {/* VIEW TOGGLE BUTTONS */}
      <div
        style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>

        <div className="table_header">
          <h3>{title} </h3>

          {showToggle ?
            <Space>
              <Button
                type={view === "grid" ? "primary" : "default"}
                icon={<AppstoreOutlined />}
                onClick={() => setView("grid")}>
                {/* Grid */}
              </Button>

              <Button
                type={view === "table" ? "primary" : "default"}
                icon={<TableOutlined />}
                onClick={() => setView("table")}>
                {/* Table */}
              </Button>
            </Space>
            : null}
        </div>
      </div>

      {/* CONDITIONAL RENDER */}
      {view === "grid" ? (
        <ProfileCard
          data={data}
          onPageChange={handlePaginationChange}
          pagination={
            pagination
          }
        />
      ) : (
        <ProfileTable
          loading={loading}
          data={data}
          onPageChange={handlePaginationChange}
          pagination={
            pagination
          }
        />
      )}
    </div>
  );
};

export default ProfileContainer;