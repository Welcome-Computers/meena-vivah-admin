import {
  Space,
  Tag
} from "antd";

const ProfileData = ({ record }: any) => {
  return (
    <div style={{ padding: 12 }}>
      {/* Parents */}
      <div className="other_info">
        <h4>Family Details</h4>
        <div>
          <p>
            <b>Father:</b>{` ${record.fathersname}`} <Tag color={"gray"}>{record.fathersoccupation}</Tag>
          </p>
          <p>
            <b>Mother:</b>{` ${record.mothersname}`} <Tag color={"gray"}>{record.mothersoccupation}</Tag>
          </p>
        </div>
      </div>
      {/* Gotra */}
      <div className="other_info">
        <h4>
          Gotra Details
        </h4>
        <div>
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
      </div>
      {/* Address */}
      {record?.address_details?.length ? (
        <div className="other_info">
          <h4>Address Details</h4>
          <div>
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
                      <b className="capitalize">{item.type}:</b>{" "}
                      {addressText || "-"}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      ) : null}

      {/* Siblings */}
      {record?.sibling_details?.length ? (
        <div className="other_info">
          <h4>Sibling Details</h4>
          <div>
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
        </div>
      ) : null}

      {/* Other Gotra */}
      {record?.other_gotra?.length ? (
        <div className="other_info">
          <h4>Other Gotra</h4>

          <div>
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
        </div>
      ) : null}


      {/* Preferences */}
      {(record.preferences) && (
        <div>
          {record.preferences && (
            <div className="other_info">
              <h4>Preferences</h4>
              <div>
                {` ${record.preferences}`}
              </div>
            </div>
          )}
        </div>
      )}

      {(record.otherinfo) && (
        <div>
          {record.otherinfo && (
            <div className="other_info">
              <h4>Other Info</h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: record.otherinfo,
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileData;