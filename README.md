## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group|string|null: false|

### Association
- has_many :groups_users
- has_many :message
- has_many :users, through: :groups_users

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_name|string|null: false|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :groups_users
- has_many :message

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|string|null: false|
|image|string||
|user_id|integer|null: false,foreign_key: true|
|group_id|integer|null: false,foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
