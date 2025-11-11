import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Plus, Settings, TrashIcon } from "lucide-react";

export function AddButtonGroupDropdown() {
  return (
    <ButtonGroup>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Ellipsis color="#626263" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="[--radius:1rem]">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Plus />
              Add Collections
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings color="#626263" />
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <TrashIcon />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
