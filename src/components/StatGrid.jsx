import React from "react";
import { ListTodo, Clock, Check } from "lucide-react";
import { StatCard } from "./StatCard";

export function StatGrid({ totalTasks, inProgressTasks, completedTasks }) {
  return (
    <div>
      <h2 className="mobile-overview-header">Overview</h2>
      <section className="stat-grid" aria-label="Task Statistics">
        <StatCard
          icon={ListTodo}
          iconTheme="purple"
          label="Total tasks"
          value={totalTasks}
          subtext="Across all projects"
        />

        <StatCard
          icon={Clock}
          iconTheme="blue"
          label="In progress"
          badgeText="In progress"
          value={inProgressTasks}
          subtext="Keep the momentum"
          className="in-progress-stat"
        />

        <StatCard
          icon={Check}
          iconTheme="green"
          label="Completed"
          value={completedTasks}
          subtext="Great work this week"
        />
      </section>
    </div>
  );
}
