import { STATUS_TYPES } from "@/lib/modules/admin/admin.types";
import { IProfile } from "@/redux/features/profile/types";
import { IPagination, } from "@/redux/features/shared/types";
import { AppstoreOutlined, TableOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useState } from "react";
import { ProfileCard } from "./ProfileCard";
import ProfileTable from "./ProfileTable";

interface iProps {
  loading: boolean;
  data: IProfile[];
  pagination: IPagination;
  defaultShow?: "grid" | "table";
  title?: string;
  showToggle?: boolean;
  getProfiles?: (page: number, limit?: number, status?: STATUS_TYPES[]) => void
  headerRightSec?: any;
  showAction?: boolean;
}

const ProfileContainer = (props: iProps) => {
  const {
    loading,
    data,
    pagination,
    getProfiles,
    defaultShow = "grid",
    title = "Profiles",
    showToggle = true,
    showAction = false,
  } = props;

  const [view, setView] = useState<"grid" | "table">(defaultShow);

  const handleGetProfiles = (
    { page = 1, pageSize, status }
      : { page?: number, pageSize?: number, status?: STATUS_TYPES[] }
  ) => {
    debugger;
    console.log({ page, pageSize, status })
    getProfiles?.(page, pageSize, status);
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
          loading={loading}
          handleGetProfiles={handleGetProfiles}
          showAction={showAction}
          pagination={pagination}
        />
      ) : (
        <ProfileTable
          loading={loading}
          data={data}
          showAction={showAction}
          handleGetProfiles={handleGetProfiles}
          pagination={pagination}
        />
      )}
    </div>
  );
};

export default ProfileContainer;