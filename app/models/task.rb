# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :user
  validates :title, :description,  presence: true
  validates :title, uniqueness: true

  task_statuses = %w[open new spam].freeze
  validates :state, presence: true, inclusion: { in: task_statuses }
end
