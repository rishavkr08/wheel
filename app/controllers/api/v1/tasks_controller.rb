# frozen_string_literal: true

class Api::V1::TasksController < Api::V1::BaseController
  def index
    tasks = current_user.tasks
    render json: tasks
  end

  def create
    @task = Task.new(task_params.merge(user: current_user))
    if @task.save
      render json: { task: @task, notice: "#{@task.title} has been added to your task." }
    else
      render json: { error: @task.errors.full_messages.to_sentence }, status: 422
    end
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

  private

    def task_params
      params.require(:task).permit([ :title, :state, :description, :due_date, :ace_invoice_entry, :reminder_email])
    end
end
