import React, { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { initialSampleTasks } from "./data/sampleTasks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { MobileHeader } from "./components/MobileHeader";
import { FocusNotes } from "./components/FocusNotes";
import { StatGrid } from "./components/StatGrid";
import { TaskControls } from "./components/TaskControls";
import { TaskList } from "./components/TaskList";
import { TaskFormModal } from "./components/TaskFormModal";
import { ConfirmDeleteModal } from "./components/ConfirmDeleteModal";
import { MobileBottomNav } from "./components/MobileBottomNav";

export function App() {
  // Main State: Single source of truth with browser persistence
  const [tasks, setTasks] = useLocalStorage("focusboard_tasks", initialSampleTasks);

  // Active navigation tab
  const [activeNavTab, setActiveNavTab] = useState("overview");

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  // Derived Statistics
  const totalTasks = tasks.length;
  const inProgressTasks = useMemo(
    () => tasks.filter((t) => t.status === "In progress").length,
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks.filter((t) => t.status === "Completed").length,
    [tasks]
  );
  const completionPercentage = useMemo(() => {
    if (totalTasks === 0) return 0;
    return Math.round((completedTasks / totalTasks) * 100);
  }, [totalTasks, completedTasks]);

  // Derived Filtered Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Case-insensitive search on title
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      // 2. Status filter
      let matchesStatus = true;
      if (statusFilter === "in-progress") {
        matchesStatus = task.status === "In progress";
      } else if (statusFilter === "completed") {
        matchesStatus = task.status === "Completed";
      } else if (statusFilter === "to-do") {
        matchesStatus = task.status === "To do";
      }

      // 3. Priority filter
      const matchesPriority =
        priorityFilter === "all"
          ? true
          : task.priority.toLowerCase() === priorityFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const isFiltered =
    searchQuery.trim() !== "" || statusFilter !== "all" || priorityFilter !== "all";

  // CRUD Operations
  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsFormModalOpen(true);
  };

  const handleSaveTask = (taskPayload) => {
    if (editingTask) {
      // Update existing task
      setTasks((prev) =>
        prev.map((t) => (t.id === taskPayload.id ? { ...t, ...taskPayload } : t))
      );
    } else {
      // Add new task
      const newTask = {
        ...taskPayload,
        id: `TASK-${Date.now()}`,
      };
      setTasks((prev) => [newTask, ...prev]);
    }
  };

  const handleToggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          let nextStatus = "In progress";
          if (t.status === "To do") nextStatus = "In progress";
          else if (t.status === "In progress") nextStatus = "Completed";
          else nextStatus = "To do";
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const handleDeleteClick = (id) => {
    setDeletingTaskId(id);
  };

  const handleConfirmDelete = () => {
    if (deletingTaskId) {
      setTasks((prev) => prev.filter((t) => t.id !== deletingTaskId));
      setDeletingTaskId(null);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPriorityFilter("all");
  };

  const deletingTaskTitle = useMemo(() => {
    if (!deletingTaskId) return "";
    const found = tasks.find((t) => t.id === deletingTaskId);
    return found ? found.title : "";
  }, [tasks, deletingTaskId]);

  return (
    <div className="app-layout">
      {/* Desktop Left Sidebar */}
      <Sidebar activeTab={activeNavTab} onTabChange={setActiveNavTab} />

      {/* Main Page Area */}
      <div className="main-wrapper">
        {/* Desktop Header */}
        <Header />

        {/* Mobile Header */}
        <MobileHeader />

        {/* Main Dashboard Content */}
        <main className="content-container">
          {/* Dashboard Title & CTA */}
          <div className="dashboard-heading-row">
            <div className="dashboard-title-group">
              <h1>
                <span className="desktop-title">Your work, in focus.</span>
                <span className="mobile-title" style={{ display: "none" }}>
                  Your work,{"\n"}in focus.
                </span>
              </h1>
              <p className="desktop-subtitle">
                Plan your day, stay organized, and celebrate small wins.
              </p>
              <p className="mobile-subtitle" style={{ display: "none" }}>
                Stay organized and keep moving forward.
              </p>
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={handleOpenCreateModal}
              aria-label="Create new task"
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>New task</span>
            </button>
          </div>

          {/* Focus Notes Carousel Banner */}
          <FocusNotes />

          {/* Overview / Statistics Grid */}
          <StatGrid
            totalTasks={totalTasks}
            inProgressTasks={inProgressTasks}
            completedTasks={completedTasks}
            completionPercentage={completionPercentage}
          />

          {/* My Tasks Section */}
          <section className="tasks-section" aria-label="My tasks list">
            <div className="tasks-section-header">
              <div className="tasks-section-title-group">
                <h2>My tasks</h2>
                <p className="desktop-subtitle">Manage and track everything in one place.</p>
                <p className="mobile-subtitle" style={{ display: "none" }}>Your priorities for this week</p>
              </div>

              {/* Desktop "View all tasks" / Mobile Add Button */}
              <button
                type="button"
                className="view-all-link desktop-only-action"
                onClick={handleResetFilters}
              >
                View all tasks
              </button>

              <button
                type="button"
                className="mobile-add-btn"
                style={{ display: "none" }}
                onClick={handleOpenCreateModal}
                aria-label="Add task"
              >
                <Plus size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Task Controls: Tabs, Search, Priority */}
            <TaskControls
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              totalTasksCount={totalTasks}
            />

            {/* Task Rows List */}
            <TaskList
              tasks={filteredTasks}
              onToggleStatus={handleToggleStatus}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteClick}
              onStatusChange={handleStatusChange}
              isFiltered={isFiltered}
              onResetFilters={handleResetFilters}
              onOpenCreateModal={handleOpenCreateModal}
            />
          </section>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav activeTab={activeNavTab} onTabChange={setActiveNavTab} />

      {/* Create / Edit Task Modal */}
      <TaskFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingTaskId)}
        onClose={() => setDeletingTaskId(null)}
        onConfirm={handleConfirmDelete}
        taskTitle={deletingTaskTitle}
      />
    </div>
  );
}

export default App;
