//! src/config.rs

use std::path::Path;

use anyhow::Context;
use config::FileFormat;
use secrecy::Secret;
use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct Settings {
    pub smtp_addr: String,
    pub backend_email: String,
    pub backend_username: String,
    pub admin_email: String,
    #[serde(default = "backend_email_password")]
    pub backend_email_password: Secret<String>,
}

impl Settings {
    pub fn load_configuration() -> Result<Settings, anyhow::Error> {
        let config_file = std::env::var("APP_CONFIG_FILE")
            .expect("APP_CONFIG_FILE var is unset!");

        config::Config::builder()
            .add_source(config::File::new(&config_file, FileFormat::Yaml))
            .build()?
            .try_deserialize()
            .context("Failed to build config from local config file.")
    }
}

impl Default for Settings {
    fn default() -> Self {
        Self::load_configuration().unwrap()
    }
}

fn load_value_from_file<T: AsRef<Path>>(
    path: T,
) -> Result<String, std::io::Error> {
    Ok(std::fs::read_to_string(path)?.trim().to_string())
}

fn backend_email_password() -> Secret<String> {
    Secret::new(
        load_value_from_file(
            std::env::var("BACKEND_EMAIL_PASSWORD_FILE")
                .expect("BACKEND_EMAIL_PASSWORD_FILE var is unset!"),
        )
        .expect("Can't read backend email password file!"),
    )
}
