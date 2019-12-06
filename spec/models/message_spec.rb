require 'rails_helper'
RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save' do
      # 4. contentがあれば登録できること
      it "is valid with a content " do
        expect(build(:message, image:nil)).to be_valid
      end
      # 5. 画像があれば登録できること
      it "is valid with image " do
        expect(build(:message, content: nil)).to be_valid
      end
        # 1.contentとimage両方が空では登録できないこと
      it "is valid with content and image" do
      message = build(:message)
      expect(message).to be_valid
      end
    end

    context 'can not save' do
      it 'is invalid without content and image' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include('を入力してください')
      end

      # 2. group_idが空では登録できないこと
      it "is invalid without a group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      # 3. user_idが空では登録できないこと
      it "is invalid without a user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end