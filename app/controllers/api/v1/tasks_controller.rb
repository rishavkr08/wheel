# frozen_string_literal: true

class Api::V1::TasksController < Api::V1::BaseController
  def index
    tasks = current_user.tasks
    render json: tasks
  end
end
