import { useAvailableHeight } from "@/hook/useAvailableHeight";
import { STATUS_TYPES } from "@/lib/modules/admin/admin.types";
import { IProfile } from "@/redux/features/profile/types";
import { IPagination, } from "@/redux/features/shared/types";
import { useAppSelector } from "@/redux/hooks";
import { AppstoreOutlined, TableOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useRef, useState } from "react";
import { ProfileCard } from "./ProfileCard";
import ProfileTable from "./ProfileTable";

interface iProps {
  loading: boolean;
  data: IProfile[];
  pagination?: IPagination;
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

    if (typeof getProfiles === "function") {
      console.log({ page, pageSize, status });

      getProfiles(page, pageSize, status);
    }
  };

  const { layout_height } = useAppSelector(
    (state: any) => state.layoutSetting
  );

  const headerRef = useRef<HTMLDivElement>(null);

  const contentHeight = useAvailableHeight({
    subtractRefs: [headerRef],
    baseHeight: layout_height,
    debugName: "UPLOADER"
  });

  return (
    <div style={{ padding: "16px" }}>
      {/* VIEW TOGGLE BUTTONS */}

      {showToggle ?
        <div
          ref={headerRef}
          className="table_header">
          <h3>{title} </h3>

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
        </div>
        : null}

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
          contentHeight={contentHeight}
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