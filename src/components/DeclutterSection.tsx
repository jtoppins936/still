
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Home, List, CheckCircle, Trash2 } from "lucide-react";

type DeclutterItem = {
  id: string;
  item_name: string;
  category: "HOME" | "LIFE";
  completed: boolean;
  reflection?: string;
};

export const DeclutterSection = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const [newItem, setNewItem] = useState("");
  const [category, setCategory] = useState<"HOME" | "LIFE">("HOME");
  const [items, setItems] = useState<DeclutterItem[]>([]);

  const fetchItems = async () => {
    if (!session) return;
    
    const { data, error } = await supabase
      .from("declutter_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch declutter items",
        variant: "destructive",
      });
      return;
    }

    // Transform and validate the data to match DeclutterItem type
    const transformedData = (data || []).map(item => ({
      id: item.id,
      item_name: item.item_name,
      category: item.category as "HOME" | "LIFE",
      completed: item.completed || false,
      reflection: item.reflection
    }));

    setItems(transformedData);
  };

  const addItem = async () => {
    if (!session || !newItem.trim()) return;

    const { error } = await supabase.from("declutter_items").insert({
      user_id: session.user.id,
      item_name: newItem.trim(),
      category,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Item added successfully",
    });

    setNewItem("");
    fetchItems();
  };

  const toggleComplete = async (item: DeclutterItem) => {
    if (!session) return;

    const { error } = await supabase
      .from("declutter_items")
      .update({ completed: !item.completed })
      .eq("id", item.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive",
      });
      return;
    }

    fetchItems();
  };

  const deleteItem = async (id: string) => {
    if (!session) return;

    const { error } = await supabase
      .from("declutter_items")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
      return;
    }

    fetchItems();
  };

  return (
    <div className="max-w-3xl mx-auto">
      {session ? (
        <>
          <div className="flex gap-4 mb-8">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter something to declutter..."
              className="flex-1"
            />
            <div className="flex gap-2">
              <Button
                variant={category === "HOME" ? "default" : "outline"}
                onClick={() => setCategory("HOME")}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button
                variant={category === "LIFE" ? "default" : "outline"}
                onClick={() => setCategory("LIFE")}
              >
                <List className="w-4 h-4 mr-2" />
                Life
              </Button>
            </div>
            <Button onClick={addItem}>Add</Button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleComplete(item)}
                    >
                      <CheckCircle
                        className={`w-5 h-5 ${
                          item.completed ? "text-green-500" : "text-gray-300"
                        }`}
                      />
                    </Button>
                    <span
                      className={`text-lg ${
                        item.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {item.item_name}
                    </span>
                    <span className="text-sm px-2 py-1 bg-gray-100 rounded">
                      {item.category}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-600">
          Please sign in to use the declutter feature.
        </div>
      )}
    </div>
  );
};
