import {
  Space,
  Tag
} from "antd";

const ProfileData = ({ record }: any) => {

  const hasFamilyDetails =
    record.fathersname ||
    record.fathersoccupation ||
    record.mothersname ||
    record.mothersoccupation;

  const hasGotraDetails =
    record.self_gotra ||
    record.m_gotra ||
    record.gm_gotra ||
    record.mat_gm_gotra;


  const validAddresses =
    record?.address_details?.filter((item: any) =>
      [item.address, item.city, item.state, item.pincode].some(Boolean)
    ) || [];


  return (
    <div style={{ padding: 12 }}>
      {/* Parents */}
      {hasFamilyDetails && (
        <div className="other_info">
          <h4>Family Details</h4>

          <div>
            {(record.fathersname || record.fathersoccupation) && (
              <p>
                <b>Father:</b>
                {record.fathersname ? ` ${record.fathersname}` : ""}
                {record.fathersoccupation && (
                  <Tag color="gray">{record.fathersoccupation}</Tag>
                )}
              </p>
            )}

            {(record.mothersname || record.mothersoccupation) && (
              <p>
                <b>Mother:</b>
                {record.mothersname ? ` ${record.mothersname}` : ""}
                {record.mothersoccupation && (
                  <Tag color="gray">{record.mothersoccupation}</Tag>
                )}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Gotra */}
      {hasGotraDetails && (
        <div className="other_info">
          <h4>Gotra Details</h4>
          <div>
            <Space wrap>
              {record.self_gotra && (
                <Tag>
                  <b>Self:</b> {record.self_gotra}
                </Tag>
              )}

              {record.m_gotra && (
                <Tag>
                  <b>Mother:</b> {record.m_gotra}
                </Tag>
              )}

              {record.gm_gotra && (
                <Tag>
                  <b>Grandmother:</b> {record.gm_gotra}
                </Tag>
              )}

              {record.mat_gm_gotra && (
                <Tag>
                  <b>Maternal GM:</b> {record.mat_gm_gotra}
                </Tag>
              )}
            </Space>
          </div>
        </div>
      )}

      {/* Address */}
      {validAddresses.length > 0 && (
        <div className="other_info">
          <h4>Address Details</h4>

          <div>
            {validAddresses.map((item: any, index: number) => {
              const addressText = [
                item.address,
                item.city,
                item.state,
                item.pincode,
              ]
                .filter(Boolean)
                .join(", ");

              return (
                <div key={index} style={{ marginBottom: 10 }}>
                  <p>
                    <b className="capitalize">{item.type}:</b> {addressText}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

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