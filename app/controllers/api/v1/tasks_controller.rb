# frozen_string_literal: true

class Api::V1::TasksController < Api::V1::BaseController
  def index
    tasks = current_user.tasks
    render json: tasks
  end

  def bulk_delete
    tasks = Task.where(id: params[:ids], user: current_user)
    tasks_count = tasks.size
    if tasks.empty?
      render json: { error: "No tasks found." }, status: 422
    else
      tasks.destroy_all
      render json: { notice: "#{tasks_count} tasks has been deleted." }, status: 200
    end
  end
end
