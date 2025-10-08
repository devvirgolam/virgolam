import React, { useState, useEffect } from "react";
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
} from "antd";
import Title from "antd/es/typography/Title";
const { Text } = Typography;
// Mock leadApi hooks (replace with actual API hooks in a real app)
const useListLeadsQuery = (filters) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const mockLeads = [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          phone: "123-456-7890",
          value: 1000,
          status: "new",
          location: "New York",
          assignee: { id: "u1", name: "Alice Smith", avatar: "" },
          source: "website",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "987-654-3210",
          value: 2000,
          status: "contacted",
          location: "London",
          assignee: { id: "u2", name: "Bob Johnson", avatar: "" },
          source: "referral",
        },
      ].filter((lead) => {
        return (
          (!filters.search ||
            lead.name.toLowerCase().includes(filters.search.toLowerCase())) &&
          (!filters.status || lead.status === filters.status) &&
          (!filters.assigned_to || lead.assignee.id === filters.assigned_to)
        );
      });
      setData(mockLeads);
      setIsLoading(false);
    }, 500);
  }, [filters.search, filters.status, filters.assigned_to]);

  return { data, isLoading, error };
};

const useCreateLeadMutation = () => {
  return [
    (leadData) =>
      Promise.resolve({ data: { id: Math.random().toString(), ...leadData } }),
  ];
};

const useUpdateLeadMutation = () => {
  return [(leadData) => Promise.resolve({ data: leadData })];
};

const useDeleteLeadMutation = () => {
  return [(id) => Promise.resolve({ data: id })];
};

const SortableLead = ({ lead, index, status }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lead.id });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [form] = Form.useForm();
  const [deleteLead] = useDeleteLeadMutation();
  const [updateLead] = useUpdateLeadMutation();
  const leadOwners = lead.assignee
    ? [
        {
          id: lead.assignee.id,
          name: lead.assignee.name,
          avatar: lead.assignee.avatar,
        },
      ]
    : [];

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="mb-4"
      >
        <Card
          className={`border ${
            status === "Contacted"
              ? "border-yellow-500"
              : status === "Not Contacted"
              ? "border-blue-500"
              : status === "Closed"
              ? "border-green-500"
              : "border-red-500"
          }`}
        >
          <div
            className={`h-2 w-full mb-3 ${
              status === "Contacted"
                ? "bg-yellow-500"
                : status === "Not Contacted"
                ? "bg-blue-500"
                : status === "Closed"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          ></div>
          <div className="flex items-center mb-3">
            <Avatar
              className={`mr-2 ${
                status === "Contacted"
                  ? "bg-yellow-100"
                  : status === "Not Contacted"
                  ? "bg-blue-100"
                  : status === "Closed"
                  ? "bg-green-100"
                  : "bg-red-100"
              }`}
            >
              <span
                className={`text-${
                  status === "Contacted"
                    ? "yellow-500"
                    : status === "Not Contacted"
                    ? "blue-500"
                    : status === "Closed"
                    ? "green-500"
                    : "red-500"
                }`}
              >
                {lead.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </Avatar>
            <Title level={5} className="m-0">
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
          <div className="flex items-center justify-between border-t pt-3 mt-3">
            <Avatar
              src={lead.company_icon || "/assets/img/icons/company-icon-01.svg"}
              size="small"
            />
            <Space>
              <Button
                type="text"
                icon={<i className="ti ti-phone-check"></i>}
              />
              <Button
                type="text"
                icon={<i className="ti ti-message-circle-2"></i>}
              />
              <Button
                type="text"
                icon={<i className="ti ti-color-swatch"></i>}
              />
            </Space>
          </div>
          <div className="flex justify-end mt-3">
            <Button
              type="primary"
              size="small"
              className="mr-2"
              onClick={() => {
                setEditLead(lead);
                setIsEditDrawerOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              danger
              size="small"
              onClick={() => {
                setSelectedLeadId(lead.id);
                setIsDeleteModalOpen(true);
              }}
            >
              Delete
            </Button>
          </div>
        </Card>
      </div>

      <Drawer
        title="Edit Lead"
        open={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        width={400}
      >
        {editLead && (
          <Form
            form={form}
            layout="vertical"
            initialValues={editLead}
            onFinish={async (values) => {
              try {
                await updateLead({ id: editLead.id, ...values }).unwrap();
                setIsEditDrawerOpen(false);
                setEditLead(null);
                form.resetFields();
              } catch (error) {
                Modal.error({
                  title: "Error",
                  content: "Failed to update lead: " + error.data?.error,
                });
              }
            }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { type: "email", message: "Please input a valid email!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input />
            </Form.Item>
            <Form.Item name="message" label="Message">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="source" label="Source">
              <Select>
                <Select.Option value="website">Website</Select.Option>
                <Select.Option value="landing_page">Landing Page</Select.Option>
                <Select.Option value="ad">Ad</Select.Option>
                <Select.Option value="newsletter">Newsletter</Select.Option>
                <Select.Option value="referral">Referral</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select>
                <Select.Option value="new">Not Contacted</Select.Option>
                <Select.Option value="contacted">Contacted</Select.Option>
                <Select.Option value="qualified">Qualified</Select.Option>
                <Select.Option value="converted">Closed</Select.Option>
                <Select.Option value="lost">Lost</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="assigned_to" label="Assigned To">
              <Select allowClear>
                <Select.Option value="">Unassigned</Select.Option>
                {leadOwners.map((owner) => (
                  <Select.Option key={owner.id} value={owner.id}>
                    {owner.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="value" label="Value">
              <Input type="number" step="0.01" />
            </Form.Item>
            <Form.Item name="location" label="Location">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Lead
              </Button>
            </Form.Item>
          </Form>
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
            disabled={!selectedLeadId}
            onClick={async () => {
              try {
                await deleteLead(selectedLeadId).unwrap();
                setIsDeleteModalOpen(false);
                setSelectedLeadId(null);
              } catch (error) {
                Modal.error({
                  title: "Error",
                  content: "Failed to delete lead: " + error.data?.error,
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
    { Contacted: [], "Not Contacted": [], Closed: [], Lost: [] }
  );

  const getSummary = (leads) => {
    const count = leads.length;
    const totalValue = leads
      .reduce((sum, lead) => sum + (lead.value || 0), 0)
      .toLocaleString();
    return `${count} Leads - $${totalValue}`;
  };

  const sensors = useSensors(useSensor(PointerSensor));

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <Title level={3}>Leads Management</Title>
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <Space wrap>
          <Input
            placeholder="Search"
            prefix={<i className="ti ti-search"></i>}
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            style={{ width: 200 }}
          />
          <Select
            placeholder="Lead Status"
            value={filters.status || null}
            onChange={(value) => handleFilterChange("status", value)}
            style={{ width: 200 }}
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
            style={{ width: 200 }}
            allowClear
          >
            {leadOwners.map((owner) => (
              <Select.Option key={owner.id} value={owner.id}>
                {owner.name}
              </Select.Option>
            ))}
          </Select>
          <Button onClick={handleResetFilters}>Reset</Button>
        </Space>
        <Space>
          <Button
            type="primary"
            icon={<i className="ti ti-square-rounded-plus-filled mr-1"></i>}
            onClick={() => setIsAddDrawerOpen(true)}
          >
            Add Lead
          </Button>
        </Space>
      </div>

      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="flex overflow-x-auto gap-4">
          {Object.entries(groupedLeads).map(([status, leads]) => (
            <div key={status} className="min-w-[300px] flex-1">
              <Card
                title={
                  <div className="flex justify-between items-center">
                    <Space>
                      <i
                        className={`ti ti-circle-filled text-${
                          status === "Contacted"
                            ? "yellow-500"
                            : status === "Not Contacted"
                            ? "blue-500"
                            : status === "Closed"
                            ? "green-500"
                            : "red-500"
                        }`}
                      ></i>
                      <Title level={5} className="m-0">
                        {status}
                      </Title>
                    </Space>
                    <Text>{getSummary(leads)}</Text>
                  </div>
                }
                className="border"
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
            </div>
          ))}
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
                content: "Failed to create lead: " + error.data?.error,
              });
            }
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", message: "Please input a valid email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="message" label="Message">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="source" label="Source">
            <Select>
              <Select.Option value="website">Website</Select.Option>
              <Select.Option value="landing_page">Landing Page</Select.Option>
              <Select.Option value="ad">Ad</Select.Option>
              <Select.Option value="newsletter">Newsletter</Select.Option>
              <Select.Option value="referral">Referral</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select>
              <Select.Option value="new">Not Contacted</Select.Option>
              <Select.Option value="contacted">Contacted</Select.Option>
              <Select.Option value="qualified">Qualified</Select.Option>
              <Select.Option value="converted">Closed</Select.Option>
              <Select.Option value="lost">Lost</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="assigned_to" label="Assigned To">
            <Select allowClear>
              <Select.Option value="">Unassigned</Select.Option>
              {leadOwners.map((owner) => (
                <Select.Option key={owner.id} value={owner.id}>
                  {owner.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="value" label="Value">
            <Input type="number" step="0.01" />
          </Form.Item>
          <Form.Item name="location" label="Location">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Lead
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Leads;
