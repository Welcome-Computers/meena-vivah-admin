import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import style from "@/styles/ProfileCard.module.css";

export const ProfileCard = () => {
 const users = [
  {
    id: 1,
    name: "Rahul Sharma",
    age: 27,
    gender: "male",
    profession: "Frontend Developer",
    education: "B.Tech in Computer Science",
    gotra: "Bharadwaj",
    location: "Jaipur, Rajasthan",
  },
  {
    id: 2,
    name: "Amit Verma",
    age: 29,
    gender: "male",
    profession: "Backend Engineer",
    education: "MCA",
    gotra: "Kashyap",
    location: "Delhi, India",
  },
  {
    id: 3,
    name: "Priya Singh",
    age: 25,
    gender: "female",
    profession: "UI/UX Designer",
    education: "B.Des",
    gotra: "Vashishtha",
    location: "Lucknow, Uttar Pradesh",
  },
   {
    id: 3,
    name: "Priya Singh",
    age: 25,
    gender: "female",
    profession: "UI/UX Designer",
    education: "B.Des",
    gotra: "Vashishtha",
    location: "Lucknow, Uttar Pradesh",
  },
  {
    id: 4,
    name: "Sneha Patel",
    age: 26,
    gender: "female",
    profession: "Software Engineer",
    education: "B.Tech IT",
    gotra: "Gautam",
    location: "Ahmedabad, Gujarat",
  },
];
  return (
    <div className={style.mainContainer}>
        {users.map((user,index)=>(

        
      <div key={index} className={style.card}>
        <div className={style.avatar}>
          <Avatar size={140} icon={<UserOutlined />} />
        </div>

        <div className={style.userInfo}>
          <h3>{user.name}</h3>
          <p className={style.profession}>{user.profession}</p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Education:</strong> {user.education}
          </p>
          <p>
            <strong>Location:</strong> {user.location}
          </p>
          <p>
            <strong>Gotra:</strong> {user.gotra}
          </p>
        </div>
      </div>
        )
        )}



    </div>
  );
};
