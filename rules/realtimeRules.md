# Rules default // Qualquer um pode fazer alterações no código

{
  "rules": {
    ".read": "now < 1651719600000",  // 2022-5-5
    ".write": "now < 1651719600000",  // 2022-5-5
  }
}

# Auth Users // Não está seguro pois qualquer usuário logado pode fazer alterações em outros registros.

{
  "rules": {
    ".read": "auth != null",  // 2022-5-5
    ".write": "auth != null",  // 2022-5-5
  }
}

# Account User // O usuário só pode fazer alterações no proprio UID.

{
  "rules": {
    "users":{
      "$uid":{
        ".read": "$uid == auth.uid",  // 2022-5-5
        ".write": "$uid == auth.uid",  // 2022-5-5
      }
    }
  }
}

# Limitando a quantidade de dados inseridos

{
  "rules": {
    "users":{
      "$uid":{
        ".read": "$uid == auth.uid",  // 2022-5-5
        ".write": "$uid == auth.uid",  // 2022-5-5
        "$tid": {
          ".validate": "newData.child('name').isString() && newData.child('name').val().length <= 30"
        }
      }
    }
  }
}


