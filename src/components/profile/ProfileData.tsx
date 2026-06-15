import {
  Space,
  Tag
} from "antd";

const ProfileData = ({ record }: any) => {
  return (
    <div style={{ padding: 12 }}>
      {/* Parents */}
      <div
        style={{ marginBottom: 16 }}>
        <h4>Family Details</h4>
        <p>
          <b>Father:</b>{` ${record.fathersname}`} <Tag color={"gray"}>{record.fathersoccupation}</Tag>
        </p>
        <p>
          <b>Mother:</b>{` ${record.mothersname}`} <Tag color={"gray"}>{record.mothersoccupation}</Tag>
        </p>
      </div>
      {/* Gotra */}
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <h4>
          Gotra Details
        </h4>
        <Space wrap>
          <Tag>
            <b>Self:</b>{` ${record.self_gotra}`}
          </Tag>
          <Tag>
            <b>Mother:</b>{` ${record.m_gotra}`}
          </Tag>
          <Tag>
            <b>Grandmother:</b>{` ${record.gm_gotra}`}
          </Tag>
          <Tag>
            <b>Maternal GM:</b>{` ${record.mat_gm_gotra}`}
          </Tag>
        </Space>
      </div>
      {/* Address */}
      {record?.address_details?.length ? (
        <div style={{ marginBottom: 16 }}>
          <h4>Address Details</h4>

          {record.address_details.map(
            (item: any, index: number) => {
              const addressText = [
                item.address,
                item.city,
                item.state,
                item.pincode,
              ]
                .filter(Boolean)
                .join(", ");

              return (
                <div
                  key={index}
                  style={{ marginBottom: 10 }}
                >
                  <p>
                    <b>{item.type}:</b>{" "}
                    {addressText || "-"}
                  </p>
                </div>
              );
            }
          )}
        </div>
      ) : null}

      {/* Siblings */}
      {record?.sibling_details?.length ? (
        <div style={{ marginBottom: 16 }}>
          <h4>Sibling Details</h4>

          {record.sibling_details.map(
            (item: any, index: number) => {
              const siblingText = [
                item.name,
                item.education,
                item.occupation,
              ]
                .filter(Boolean)
                .join(" - ");

              return (
                <div key={index}>

                  <Tag color={record.relation === "boy" ? "blue" : "magenta"}        >
                    {record.relation?.toUpperCase()}
                  </Tag>

                  {siblingText || "-"}
                </div>
              );
            }
          )}
        </div>
      ) : null}

      {/* Other Gotra */}
      {record?.other_gotra?.length ? (
        <div style={{ marginBottom: 16 }}>
          <h4>Other Gotra</h4>

          <Space wrap>
            {record.other_gotra.map(
              (item: any, index: number) => {
                const text = [
                  item.other_gotra_relation,
                  item.other_gotra_name,
                ]
                  .filter(Boolean)
                  .join(": ");

                return (
                  <Tag key={index} color="purple">
                    {text}
                  </Tag>
                );
              }
            )}
          </Space>
        </div>
      ) : null}


      {/* Preferences */}
      {(record.preferences || record.otherinfo) && (
        <div>
          {record.preferences && (
            <p>
              <Tag color="blue">Preferences</Tag>
              {` ${record.preferences}`}
            </p>
          )}

          {record.otherinfo && (
            <p>
              <Tag color="green">Other Info</Tag>
              {` ${record.otherinfo}`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileData;