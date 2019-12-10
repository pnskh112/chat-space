class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable,  :validatable

  has_many :messages
  has_many :group_users
  has_many :groups, through: :group_users
  # # ログ出力
  # require 'logger'
  # logger = Logger.new(STDOUT)
  # logger.debug("Hello.")
  # logger.close
  # # ログ出力
  # 試しに消してみた⬇︎191209 1340
  # def self.search(input,id)
  #   return nil if input == ""
  #   User.where(['name like ?', "%#{input}%"] ).where.not(id: id).limit(10)
  # end
end