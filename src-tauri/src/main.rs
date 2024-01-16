// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
// use argon2::{self, Config};
// use base64::{encode, decode};
// use std::error::Error;

// #[tauri::command]
// fn encrypt_data(data: String, master_password: String) -> Result<String, String> {
//     match do_encrypt_data(data, master_password) {
//         Ok(encrypted_data) => Ok(encrypted_data),
//         Err(error) => Err(error.to_string()),
//     }
// }

// fn do_encrypt_data(data: String, master_password: String) -> Result<String, Box<dyn Error>> {
//     let key = generate_key(&master_password)?;
//     let encrypted_data = perform_encryption(data.as_bytes(), &key);
//     let encoded_data = encode(&encrypted_data);
//     Ok(encoded_data)
// }

// #[tauri::command]
// fn decrypt_data(encrypted_data: String, master_password: String) -> Result<String, String> {
//     match do_decrypt_data(encrypted_data, master_password) {
//         Ok(decrypted_data) => Ok(decrypted_data),
//         Err(error) => Err(error.to_string()),
//     }
// }

// fn do_decrypt_data(encrypted_data: String, master_password: String) -> Result<String, Box<dyn Error>> {
//     let key = generate_key(&master_password)?;
//     let decoded_data = decode(&encrypted_data)?;
//     let decrypted_data = perform_decryption(&decoded_data, &key);
//     let decrypted_string = String::from_utf8_lossy(&decrypted_data).to_string();
//     Ok(decrypted_string)
// }

// fn generate_key(master_password: &str) -> Result<[u8; 32], Box<dyn Error>> {
//     let salt = b"random_salt";
//     let config = Config::default();

//     let key = argon2::hash_encoded(master_password.as_bytes(), salt, &config)?
//         .as_bytes()
//         .to_owned();

//     let mut key_array = [0u8; 32];
//     key_array.copy_from_slice(&key[..32]);

//     Ok(key_array)
// }

// fn perform_encryption(data: &[u8], key: &[u8; 32]) -> Vec<u8> {
//     let mut encrypted_data = Vec::with_capacity(data.len());
//     for (i, byte) in data.iter().enumerate() {
//         encrypted_data.push(byte ^ key[i % key.len()]);
//     }
//     encrypted_data
// }

// fn perform_decryption(encrypted_data: &[u8], key: &[u8; 32]) -> Vec<u8> {
//     perform_encryption(encrypted_data, key)
// }

fn main() {
    tauri::Builder::default()
        // .invoke_handler(tauri::generate_handler![
        //     encrypt_data,
        //     decrypt_data
        // ])
        .plugin(tauri_plugin_sql::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}


