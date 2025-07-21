import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const SchemaBuilder = () => {
  const [fields, setFields] = useState([]);

  const addField = (parentPath = []) => {
    const newField = {
      name: "",
      type: "string",
      required: false,
      children: [],
    };

    const updatedFields = [...fields];
    let current = updatedFields;
    for (const index of parentPath) {
      current = current[index].children;
    }
    current.push(newField);
    setFields(updatedFields);
  };

  const updateField = (path, key, value) => {
    const updatedFields = [...fields];
    let current = updatedFields;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]].children;
    }
    current[path[path.length - 1]][key] = value;
    setFields(updatedFields);
  };

  const removeField = (path) => {
    const updatedFields = [...fields];
    let current = updatedFields;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]].children;
    }
    current.splice(path[path.length - 1], 1);
    setFields(updatedFields);
  };

  const renderFields = (fields, path = []) =>
    fields.map((field, index) => {
      const currentPath = [...path, index];
      return (
        <div
          key={currentPath.join("-")}
          className="border p-4 my-2 rounded space-y-2"
        >
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Field Name"
              value={field.name}
              onChange={(e) => updateField(currentPath, "name", e.target.value)}
            />

            {/* Dropdown for Field Type */}
            <select
              value={field.type}
              onChange={(e) => updateField(currentPath, "type", e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="nested">Nested</option>
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="objectId">ObjectId</option>
              <option value="float">Float</option>
              <option value="boolean">Boolean</option>
              <option value="array">Array</option>
            </select>

            <Checkbox
              checked={field.required}
              onCheckedChange={(checked) =>
                updateField(currentPath, "required", !!checked)
              }
            />
            <span>Required</span>
            <Button onClick={() => addField(currentPath)} variant="outline">
              Add Child
            </Button>
            <Button onClick={() => removeField(currentPath)} variant="destructive">
              Remove
            </Button>
          </div>
          {field.children.length > 0 && (
            <div className="ml-6">{renderFields(field.children, currentPath)}</div>
          )}
        </div>
      );
    });

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(fields, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schema.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">JSON Schema Builder</h1>
      <Button onClick={() => addField()} className="mb-4">
        Add Root Field
      </Button>
      {renderFields(fields)}
      <h3 className="text-xl font-semibold mt-6">Generated Schema</h3>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(fields, null, 2)}</pre>
      <Button onClick={handleDownload} variant="secondary" className="mt-2">
        Download JSON
      </Button>
    </div>
  );
};

export default SchemaBuilder;


