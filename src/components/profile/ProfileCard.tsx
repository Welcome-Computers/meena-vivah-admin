import { getAge, isEnglishName } from "@/lib/utility/helper";
import { IProfile } from "@/redux/features/profile/types";
import { IPagination } from "@/redux/features/shared/types";
import { Avatar, Button, Pagination, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import style from "./ProfileCard.module.css";

interface iProps {
  data: IProfile[],
  pagination: IPagination,
  onPageChange: any;
  showAction?: boolean;
  loading?: boolean;
}

export const ProfileCard = (props: iProps) => {

  const { data = [], pagination, onPageChange, showAction, loading = false } = props || {}
  const router = useRouter();

  return (
    <div>
      <Spin spinning={loading}>
        <div className={style.mainContainer}>

          {data.map((record, index) => {
            const imageSrc =
              record?.gender ===
                "boy"
                ? "/images/groom.jpg"
                : "/images/bride.jpg";

            return (
              <div key={index} className={style.card}>
                <div className={style.avatar}>
                  <Avatar size={80} icon={<Image src={imageSrc} alt={record?.name}
                    width={140}
                    height={140}
                    className={style.profileImage}
                  />} />
                </div>

                <div className={style.profileInfo}>
                  <h4 className={isEnglishName(record?.name) ? "capitalize" : ""}>{record?.name}</h4>

                  <p className={style.profession}>{record?.occupation_name}</p>
                  <p>
                    <strong>Age:</strong> {getAge(record?.dob)}
                  </p>
                  <p>
                    <strong>Height:</strong> {record?.height}
                  </p>
                  <p>
                    <strong>Education:</strong> {record?.education}
                  </p>
                  <p>
                    <strong>Contact:</strong> {record?.mobile}
                  </p>
                  <p>
                    <strong>Gotra:</strong> {record?.self_gotra_name}/ {record?.m_gotra_name}/ {record?.gm_gotra_name}
                  </p>
                </div>

                {
                  showAction &&
                  <Button
                    type="link"
                    onClick={() => {
                      router.push(
                        `/profiles/update_profile?id=${record?.id}&action=update`
                      );
                    }}
                  >
                    Edit
                  </Button>
                }
              </div>
            )
          }
          )}

        </div>
        {/* GRID PAGINATION */}
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginTop: 16,
          }}
        >
          <Pagination
            current={pagination.page}
            pageSize={pagination.limit}
            total={pagination.total}
            showSizeChanger
            pageSizeOptions={["10", "20", "50", "100"]}
            showTotal={(total) => `Total ${total} profiles`}
            onChange={onPageChange}
          />
        </div>
      </Spin>
    </div>
  );
};
