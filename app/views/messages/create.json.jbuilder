json.content  @message.content
json.image  @message.image
json.user_name  @message.user.name
json.date  format_posted_time(@message.created_at)
json.is_content_present  @message.content.present?
json.is_image_present  @message.image.present?
json.id  @message.id
