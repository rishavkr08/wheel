class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks, id: :uuid do |t|
      t.string :title
      t.string :state
      t.datetime :due_date
      t.text :description
      t.boolean :ace_invoice_entry
      t.boolean :reminder_email
      t.references :user, type: :uuid

      t.timestamps
    end
  end
end
