import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function FieldComponent({ field, onChange, onAddChild, onRemove }) {
  const handleFieldChange = (key, value) => {
    onChange({ ...field, [key]: value });
  };

  return (
    <div className="border p-4 my-2 rounded-md space-y-2">
      <Input
        placeholder="Field name"
        value={field.name}
        onChange={(e) => handleFieldChange("name", e.target.value)}
      />
      <Input
        placeholder="Type (e.g. string, number)"
        value={field.type}
        onChange={(e) => handleFieldChange("type", e.target.value)}
      />
      <div className="flex items-center gap-2">
        <Checkbox
          checked={field.required}
          onCheckedChange={(value) => handleFieldChange("required", value)}
        />
        <span>Required</span>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onAddChild}>Add Nested Field</Button>
        <Button variant="destructive" onClick={onRemove}>Remove</Button>
      </div>
      {field.children?.length > 0 && (
        <div className="ml-6">
          {field.children.map((child, idx) => (
            <FieldComponent
              key={child.id}
              field={child}
              onChange={(updatedChild) => {
                const updatedChildren = [...field.children];
                updatedChildren[idx] = updatedChild;
                onChange({ ...field, children: updatedChildren });
              }}
              onAddChild={() => {
                const newChild = {
                  id: crypto.randomUUID(),
                  name: "",
                  type: "",
                  required: false,
                  children: []
                };
                onChange({ ...field, children: [...field.children, newChild] });
              }}
              onRemove={() => {
                const updatedChildren = field.children.filter((_, i) => i !== idx);
                onChange({ ...field, children: updatedChildren });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
