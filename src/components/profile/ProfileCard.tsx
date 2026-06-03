import { getAge } from "@/lib/Utility";
import { IPagination, IUser } from "@/redux/types";
import { Pagination } from "antd";
import Image from "next/image";
import style from "./ProfileCard.module.css";

interface iProps {
  data: IUser[],
  pagination: IPagination,
  onPageChange: any;
}

export const ProfileCard = (props: iProps) => {
  const { data, pagination, onPageChange } = props || {}

  return (
    <div>
      <div className={style.mainContainer}>

        {data.map((user, index) => {
          const imageSrc =
            user.gender ===
              "boy"
              ? "/images/groom.jpg"
              : "/images/bride.jpg";

          return (
            <div key={index} className={style.card}>
              <div
                className={
                  style.avatar
                }
              >
                <Image src={imageSrc} alt={user.name}
                  width={140}
                  height={140}
                  className={style.profileImage}
                />
              </div>

              <div className={style.userInfo}>
                <h3>{user.name}</h3>
                <p className={style.profession}>{user.occupation}</p>
                <p>
                  <strong>Age:</strong> {getAge(user.dob)}
                </p>
                <p>
                  <strong>Education:</strong> {user.education}
                </p>
                <p>
                  <strong>Location:</strong> {user.fathersname}
                </p>
                <p>
                  <strong>Gotra:</strong> {user.self_gotra}
                </p>
              </div>
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
