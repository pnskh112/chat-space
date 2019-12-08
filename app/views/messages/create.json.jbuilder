# json.array! @messages do |message|
  json.id @message.id
  json.content @message.content
  json.image @message.image.url
  # json.group_id message.group_id
  # json.user_id message.user_id
  json.created_at @message.created_at
  # json.updated_at message.updated_at
  json.name @message.user.name
# end