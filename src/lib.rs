use garde::Validate;
use phonenumber::PhoneNumber;
use serde::{de::Visitor, Deserialize, Deserializer, Serializer};
use time::OffsetDateTime;

pub mod client;
pub mod config;
pub mod smtp_client;

const REQUEST_TIME_INTERVAL_MINUTES_LIMIT: i64 = 5;
const ALLOWED_REQUESTS_IN_TIME_INTERVAL: usize = 5;

#[derive(Clone, Deserialize, Validate)]
pub struct Request {
    #[garde(skip)]
    pub name: String,
    #[garde(email)]
    pub email: String,

    #[garde(skip)]
    #[serde(deserialize_with = "deserialize_phone")]
    #[serde(serialize_with = "serialize_phone")]
    pub number: phonenumber::PhoneNumber,
    #[garde(length(max = 123))]
    pub message: String,

    #[garde(skip)]
    #[serde(skip)]
    pub datetime: Option<OffsetDateTime>,
}

#[allow(dead_code)]
fn serialize_phone<S>(
    number: &PhoneNumber,
    serializer: S,
) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    serializer.serialize_str(
        &number.format().mode(phonenumber::Mode::E164).to_string(),
    )
}

struct PhoneNumberVisitor;

impl<'de> Visitor<'de> for PhoneNumberVisitor {
    type Value = PhoneNumber;
    fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        v.parse::<PhoneNumber>()
            .map_err(|e| serde::de::Error::custom(e))
    }

    fn expecting(
        &self,
        formatter: &mut std::fmt::Formatter,
    ) -> std::fmt::Result {
        write!(formatter, "a valid phon number")
    }
}

fn deserialize_phone<'de, D>(deserializer: D) -> Result<PhoneNumber, D::Error>
where
    D: Deserializer<'de>,
{
    deserializer.deserialize_str(PhoneNumberVisitor)
}

pub fn format_phone_number(phone_number: &str) -> String {
    let digits: String =
        phone_number.chars().filter(|c| c.is_digit(10)).collect();

    let formatted_number = format!(
        "+{} ({}) {} {} {}",
        &digits[..1],
        &digits[1..4],
        &digits[4..7],
        &digits[7..9],
        &digits[9..]
    );

    formatted_number
}
