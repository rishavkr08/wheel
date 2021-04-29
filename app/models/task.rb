# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :user
  validates :title, :state, :description,  presence: true
  validates :title, uniqueness: true
end
