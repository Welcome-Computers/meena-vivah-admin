import PublicLayout from "@/components/layout/PublicLayout";
import ProfileContainer from "@/components/profile/ProfileContainer";
import { ProfileFilter } from "@/components/profile/ProfileFilter";
import { IUser } from "@/redux/types";
import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import style from "./Profile.module.css";



const ProfilePage = () => {

  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    "total": 6,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  });

  const getUsers = async (
    page = pagination.page,
    limit = pagination.limit
  ) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:3005/api/user?page=${page}&limit=${limit}`
      );

      const result = response?.data;

      if (result?.success) {
        setData(result?.data || []);

        setPagination(result?.pagination);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch profiles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers(1);
  }, []);


  return (
    <PublicLayout>
      <div className={style.container}>
        {/* banner */}
        <div className={style.profilebanner}>
          <img src="profilebanner.png" alt="" />
        </div>

        {/* showing profiles */}
        <section className={style.profiles}>

          {/* form gird */}
          <div className={style.gridItem}>
            <ProfileFilter />
            <div>
              <ProfileContainer
                loading={false}
                data={data}
                pagination={pagination}
              />
            </div>
          </div>
        </section>

      </div>
    </PublicLayout>
  );
};

export default ProfilePage;
