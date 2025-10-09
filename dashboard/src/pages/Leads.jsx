import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Button,
  Input,
  Select,
  Card,
  Modal,
  Form,
  Drawer,
  Space,
  Typography,
  Avatar,
  Tooltip,
  Timeline,
} from "antd";
import { motion, AnimatePresence } from "framer-motion";
import {
  useListLeadsQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
  useAddNoteMutation,
  useGetNotesQuery,
} from "../api/leadApi";

const { Text, Title } = Typography;

const SortableLead = ({ lead, index, status }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lead.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);
  const [note, setNote] = useState("");
  const [form] = Form.useForm();
  const [updateLead] = useUpdateLeadMutation();
  const [deleteLead] = useDeleteLeadMutation();
  const [addNote] = useAddNoteMutation();
  const { data: notes, isLoading: notesLoading } = useGetNotesQuery(lead.id);

  const leadOwners = lead.assignee
    ? [
        {
          id: lead.assignee.id,
          name: lead.assignee.name,
          avatar: lead.assignee.avatar,
        },
      ]
    : [];

  const handleAddNote = async () => {
    try {
      await addNote({ lead_id: lead.id, note }).unwrap();
      setNote("");
      setIsNoteDrawerOpen(false);
    } catch (error) {
      Modal.error({ title: "Error", content: "Failed to add note." });
    }
  };

  return (
    <>
      <motion.div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Card
          className={`lead-card border-${status
            .toLowerCase()
            .replace(" ", "-")}`}
          hoverable
        >
          <div
            className={`status-bar status-bar-${status
              .toLowerCase()
              .replace(" ", "-")}`}
          ></div>
          <div className="flex items-center mb-3">
            <Avatar
              className={`avatar-${status.toLowerCase().replace(" ", "-")}`}
            >
              <span>
                {lead.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </Avatar>
            <Title level={5} className="m-0 ml-2">
              <a href="#">{lead.name}</a>
            </Title>
          </div>
          <div className="space-y-2">
            <Text>
              <i className="ti ti-report-money mr-1"></i>$
              {lead.value?.toLocaleString() || "0"}
            </Text>
            <Text>
              <i className="ti ti-mail mr-1"></i>
              <a href={`mailto:${lead.email}`}>{lead.email}</a>
            </Text>
            <Text>
              <i className="ti ti-phone mr-1"></i>
              {lead.phone || "N/A"}
            </Text>
            <Text>
              <i className="ti ti-map-pin-pin mr-1"></i>
              {lead.location || "Unknown"}
            </Text>
          </div>
          <div className="flex justify-between items-center border-t pt-3 mt-3">
            <Avatar
              src={lead.company_icon || "/assets/img/icons/company-icon-01.svg"}
              size="small"
            />
            <Space>
              <Tooltip title="Add Note">
                <Button
                  type="text"
                  icon={<i className="ti ti-note"></i>}
                  onClick={() => setIsNoteDrawerOpen(true)}
                />
              </Tooltip>
              <Tooltip title="Edit Lead">
                <Button
                  type="text"
                  icon={<i className="ti ti-edit"></i>}
                  onClick={() => {
                    setIsEditDrawerOpen(true);
                    form.setFieldsValue(lead);
                  }}
                />
              </Tooltip>
              <Tooltip title="Delete Lead">
                <Button
                  type="text"
                  icon={<i className="ti ti-trash"></i>}
                  onClick={() => setIsDeleteModalOpen(true)}
                />
              </Tooltip>
            </Space>
          </div>
        </Card>
      </motion.div>

      <Drawer
        title="Edit Lead"
        open={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        width={400}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            try {
              await updateLead({ id: lead.id, ...values }).unwrap();
              setIsEditDrawerOpen(false);
            } catch (error) {
              Modal.error({
                title: "Error",
                content: "Failed to update lead.",
              });
            }
          }}
        >
          {/* Form fields similar to original, with enhanced styling */}
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input className="form-input" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", message: "Please input a valid email!" }]}
          >
            <Input className="form-input" />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input className="form-input" />
          </Form.Item>
          <Form.Item name="value" label="Value">
            <Input type="number" step="0.01" className="form-input" />
          </Form.Item>
          <Form.Item name="location" label="Location">
            <Input className="form-input" />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select className="form-select">
              <Select.Option value="new">Not Contacted</Select.Option>
              <Select.Option value="contacted">Contacted</Select.Option>
              <Select.Option value="qualified">Qualified</Select.Option>
              <Select.Option value="converted">Closed</Select.Option>
              <Select.Option value="lost">Lost</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="assigned_to" label="Assigned To">
            <Select allowClear className="form-select">
              <Select.Option value="">Unassigned</Select.Option>
              {leadOwners.map((owner) => (
                <Select.Option key={owner.id} value={owner.id}>
                  {owner.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="form-button">
              Update Lead
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Drawer
        title="Lead Notes"
        open={isNoteDrawerOpen}
        onClose={() => setIsNoteDrawerOpen(false)}
        width={400}
      >
        <Form onFinish={handleAddNote} layout="vertical">
          <Form.Item label="Add Note">
            <Input.TextArea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="form-input"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="form-button">
              Add Note
            </Button>
          </Form.Item>
        </Form>
        {notesLoading ? (
          <div>Loading notes...</div>
        ) : (
          <Timeline>
            {notes?.map((note) => (
              <Timeline.Item key={note.id}>
                <Text>{note.note}</Text>
                <br />
                <Text type="secondary">
                  {new Date(note.created_at).toLocaleString()}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        )}
      </Drawer>

      <Modal
        title="Delete Lead"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={async () => {
              try {
                await deleteLead(lead.id).unwrap();
                setIsDeleteModalOpen(false);
              } catch (error) {
                Modal.error({
                  title: "Error",
                  content: "Failed to delete lead.",
                });
              }
            }}
          >
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this lead?</p>
      </Modal>
    </>
  );
};

const Leads = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    assigned_to: "",
  });
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const { data: leads, isLoading, error } = useListLeadsQuery(filters);
  const [createLead] = useCreateLeadMutation();
  const [updateLead] = useUpdateLeadMutation();

  const sensors = useSensors(useSensor(PointerSensor));

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({ search: "", status: "", assigned_to: "" });
  };

  const groupedLeads = leads?.reduce(
    (acc, lead) => {
      const status =
        {
          new: "Not Contacted",
          contacted: "Contacted",
          qualified: "Contacted",
          converted: "Closed",
          lost: "Lost",
        }[lead.status] || "Not Contacted";
      acc[status] = acc[status] || [];
      acc[status].push(lead);
      return acc;
    },
    { "Not Contacted": [], Contacted: [], Closed: [], Lost: [] }
  );

  const getSummary = (leads) => {
    const count = leads.length;
    const totalValue = leads
      .reduce((sum, lead) => sum + (lead.value || 0), 0)
      .toLocaleString();
    return `${count} Leads - $${totalValue}`;
  };

  const onDragEnd = async ({ active, over }) => {
    if (!over) return;
    const lead = leads.find((l) => l.id === active.id);
    const newStatus = {
      Contacted: lead.status === "qualified" ? "qualified" : "contacted",
      "Not Contacted": "new",
      Closed: "converted",
      Lost: "lost",
    }[over.id];
    try {
      await updateLead({ id: lead.id, status: newStatus }).unwrap();
    } catch (error) {
      console.error("Failed to update lead status:", error);
    }
  };

  const leadOwners =
    leads?.reduce((acc, lead) => {
      if (
        lead.assignee &&
        !acc.find((owner) => owner.id === lead.assignee.id)
      ) {
        acc.push(lead.assignee);
      }
      return acc;
    }, []) || [];

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="leads-container">
      <Title level={3} className="leads-title">
        Leads Management
      </Title>
      <div className="filters-container">
        <Space wrap>
          <Input
            placeholder="Search leads"
            prefix={<i className="ti ti-search"></i>}
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="filter-input"
          />
          <Select
            placeholder="Lead Status"
            value={filters.status || null}
            onChange={(value) => handleFilterChange("status", value)}
            className="filter-select"
            allowClear
          >
            {["new", "contacted", "qualified", "converted", "lost"].map(
              (status) => (
                <Select.Option key={status} value={status}>
                  {
                    {
                      new: "Not Contacted",
                      contacted: "Contacted",
                      qualified: "Qualified",
                      converted: "Closed",
                      lost: "Lost",
                    }[status]
                  }
                </Select.Option>
              )
            )}
          </Select>
          <Select
            placeholder="Lead Owner"
            value={filters.assigned_to || null}
            onChange={(value) => handleFilterChange("assigned_to", value)}
            className="filter-select"
            allowClear
          >
            {leadOwners.map((owner) => (
              <Select.Option key={owner.id} value={owner.id}>
                {owner.name}
              </Select.Option>
            ))}
          </Select>
          <Button onClick={handleResetFilters} className="filter-button">
            Reset
          </Button>
          <Button
            type="primary"
            icon={<i className="ti ti-square-rounded-plus-filled mr-1"></i>}
            onClick={() => setIsAddDrawerOpen(true)}
            className="add-lead-button"
          >
            Add Lead
          </Button>
        </Space>
      </div>

      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="kanban-board">
          <AnimatePresence>
            {Object.entries(groupedLeads).map(([status, leads]) => (
              <motion.div
                key={status}
                className="kanban-column"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card
                  title={
                    <div className="kanban-column-header">
                      <Space>
                        <i
                          className={`ti ti-circle-filled status-icon-${status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        ></i>
                        <Title level={5}>{status}</Title>
                      </Space>
                      <Text className="summary-text">{getSummary(leads)}</Text>
                    </div>
                  }
                  className={`kanban-card border-${status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  <SortableContext
                    id={status}
                    items={leads.map((lead) => lead.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {leads.map((lead, index) => (
                      <SortableLead
                        key={lead.id}
                        lead={lead}
                        index={index}
                        status={status}
                      />
                    ))}
                  </SortableContext>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </DndContext>

      <Drawer
        title="Add Lead"
        open={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        width={400}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            try {
              await createLead(values).unwrap();
              setIsAddDrawerOpen(false);
              form.resetFields();
            } catch (error) {
              Modal.error({
                title: "Error",
                content: "Failed to create lead.",
              });
            }
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input className="form-input" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", message: "Please input a valid email!" }]}
          >
            <Input className="form-input" />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input className="form-input" />
          </Form.Item>
          <Form.Item name="value" label="Value">
            <Input type="number" step="0.01" className="form-input" />
          </Form.Item>
          <Form.Item name="location" label="Location">
            <Input className="form-input" />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select className="form-select">
              <Select.Option value="new">Not Contacted</Select.Option>
              <Select.Option value="contacted">Contacted</Select.Option>
              <Select.Option value="qualified">Qualified</Select.Option>
              <Select.Option value="converted">Closed</Select.Option>
              <Select.Option value="lost">Lost</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="assigned_to" label="Assigned To">
            <Select allowClear className="form-select">
              <Select.Option value="">Unassigned</Select.Option>
              {leadOwners.map((owner) => (
                <Select.Option key={owner.id} value={owner.id}>
                  {owner.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="form-button">
              Add Lead
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Leads;
