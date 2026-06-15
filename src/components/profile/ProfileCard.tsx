import { getAge } from "@/lib/utility";
import { IPagination, IProfile } from "@/redux/types";
import { Avatar, Button, Pagination } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import style from "./ProfileCard.module.css";

interface iProps {
  data: IProfile[],
  pagination: IPagination,
  onPageChange: any;
  showAction?: boolean;
}

export const ProfileCard = (props: iProps) => {

  const { data, pagination, onPageChange, showAction } = props || {}
  const router = useRouter();

  return (
    <div>
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
                <h4>{record?.name}</h4>
                <p className={style.profession}>{record?.occupation}</p>
                <p>
                  <strong>Age:</strong> {getAge(record?.dob)}
                </p>
                <p>
                  <strong>Education:</strong> {record?.education}
                </p>
                <p>
                  <strong>Contact:</strong> {record?.mobile}
                </p>
                <p>
                  <strong>Gotra:</strong> {record?.self_gotra}/ {record?.m_gotra}/ {record?.gm_gotra}
                </p>
              </div>

              {showAction &&
                <Button
                  type="link"
                  onClick={() => {
                    router.push(
                      `/profiles/update_profile?id=${record?.id}&action=update`
                    );
                  }}
                >
                  Edit
                </Button>}
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
    </div>
  );
};
